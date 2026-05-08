// Shopify Admin GraphQL fetcher. Server-only.
import 'server-only';
import { env, sources } from './env';

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

const REVAL = 60;

async function shopifyGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
  if (!sources.shopify) return null;
  try {
    const res = await fetch(
      `https://${env.shopify.domain}/admin/api/${env.shopify.apiVersion}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': env.shopify.token!,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: REVAL },
      },
    );
    if (!res.ok) {
      console.warn(`[shopify] HTTP ${res.status} on query: ${query.slice(0, 60)}`);
      return null;
    }
    const json = (await res.json()) as GraphQLResponse<T>;
    if (json.errors?.length) {
      console.warn('[shopify] GraphQL errors:', json.errors.map((e) => e.message).join('; '));
      return null;
    }
    return json.data ?? null;
  } catch (err) {
    console.warn('[shopify] fetch failed:', err);
    return null;
  }
}

// ---------- Revenue + orders summary ----------

export type ShopifySalesSummary = {
  todayRevenue: number;
  yesterdayRevenue: number;
  avg7dRevenue: number;
  ordersToday: number;
  newCustomersToday: number;
  aov: number;
  rtoPctTrailing14d: number;
};

function startOfDayIso(d: Date) {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x.toISOString();
}

function shiftDays(d: Date, days: number) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

type OrdersPage = {
  orders: {
    edges: {
      node: {
        id: string;
        createdAt: string;
        totalPriceSet: { shopMoney: { amount: string } };
        customer: { createdAt: string } | null;
        cancelledAt: string | null;
        displayFinancialStatus: string | null;
        displayFulfillmentStatus: string | null;
      };
    }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
};

async function fetchOrdersInRange(sinceIso: string): Promise<OrdersPage['orders']['edges'] | null> {
  const all: OrdersPage['orders']['edges'] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 6; i++) {
    const data: OrdersPage | null = await shopifyGraphQL<OrdersPage>(
      `query Orders($q: String!, $cursor: String) {
         orders(first: 100, query: $q, after: $cursor, sortKey: CREATED_AT, reverse: true) {
           edges { node {
             id createdAt cancelledAt displayFinancialStatus displayFulfillmentStatus
             totalPriceSet { shopMoney { amount } }
             customer { createdAt }
           } }
           pageInfo { hasNextPage endCursor }
         }
       }`,
      { q: `created_at:>=${sinceIso}`, cursor },
    );
    if (!data) return null;
    all.push(...data.orders.edges);
    if (!data.orders.pageInfo.hasNextPage) break;
    cursor = data.orders.pageInfo.endCursor;
    if (!cursor) break;
  }
  return all;
}

export async function getShopifySalesSummary(now = new Date()): Promise<ShopifySalesSummary | null> {
  const sinceIso = startOfDayIso(shiftDays(now, -14));
  const orders = await fetchOrdersInRange(sinceIso);
  if (!orders) return null;

  const todayStart = new Date(startOfDayIso(now)).getTime();
  const yesterdayStart = new Date(startOfDayIso(shiftDays(now, -1))).getTime();
  const sevenDaysAgo = new Date(startOfDayIso(shiftDays(now, -7))).getTime();
  const fourteenDaysAgo = new Date(startOfDayIso(shiftDays(now, -14))).getTime();

  let todayRevenue = 0;
  let yesterdayRevenue = 0;
  let last7Revenue = 0;
  let ordersToday = 0;
  let newCustomersToday = 0;
  const dailyRevenue: Record<string, number> = {};
  let cancelledOrReturned14d = 0;
  let delivered14d = 0;
  let last7OrderCount = 0;
  let last7OrderValue = 0;

  for (const { node } of orders) {
    const t = new Date(node.createdAt).getTime();
    const amount = Number(node.totalPriceSet.shopMoney.amount) || 0;
    const dayKey = node.createdAt.slice(0, 10);
    dailyRevenue[dayKey] = (dailyRevenue[dayKey] ?? 0) + amount;
    if (t >= todayStart) {
      todayRevenue += amount;
      ordersToday += 1;
      if (node.customer && new Date(node.customer.createdAt).getTime() >= todayStart) newCustomersToday += 1;
    } else if (t >= yesterdayStart) {
      yesterdayRevenue += amount;
    }
    if (t >= sevenDaysAgo) {
      last7Revenue += amount;
      last7OrderCount += 1;
      last7OrderValue += amount;
    }
    if (t >= fourteenDaysAgo) {
      const cancelled = Boolean(node.cancelledAt);
      const refunded = node.displayFinancialStatus === 'REFUNDED' || node.displayFinancialStatus === 'PARTIALLY_REFUNDED';
      if (cancelled || refunded) cancelledOrReturned14d += 1;
      if (node.displayFulfillmentStatus === 'FULFILLED') delivered14d += 1;
    }
  }

  const avg7dRevenue = last7Revenue / 7;
  const aov = last7OrderCount > 0 ? last7OrderValue / last7OrderCount : 0;
  const rtoBase = delivered14d + cancelledOrReturned14d;
  const rtoPctTrailing14d = rtoBase > 0 ? (cancelledOrReturned14d / rtoBase) * 100 : 0;

  return {
    todayRevenue,
    yesterdayRevenue,
    avg7dRevenue,
    ordersToday,
    newCustomersToday,
    aov,
    rtoPctTrailing14d,
  };
}

// ---------- 7-day revenue + spend chart ----------

export async function getShopifyDailyRevenue(now = new Date()): Promise<{ day: string; revenue: number }[] | null> {
  const sinceIso = startOfDayIso(shiftDays(now, -7));
  const orders = await fetchOrdersInRange(sinceIso);
  if (!orders) return null;
  const byDay: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    byDay[startOfDayIso(shiftDays(now, -i)).slice(0, 10)] = 0;
  }
  for (const { node } of orders) {
    const dayKey = node.createdAt.slice(0, 10);
    if (dayKey in byDay) {
      byDay[dayKey] += Number(node.totalPriceSet.shopMoney.amount) || 0;
    }
  }
  return Object.entries(byDay).map(([day, revenue]) => ({
    day: new Date(day).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    revenue,
  }));
}

// ---------- Top products ----------

export type ShopifyTopProduct = {
  sku: string;
  name: string;
  sold: number;
  revenue: number;
  marginPct: number;
  rtoPct: number;
};

type LineItemsPage = {
  orders: {
    edges: {
      node: {
        id: string;
        createdAt: string;
        cancelledAt: string | null;
        displayFinancialStatus: string | null;
        displayFulfillmentStatus: string | null;
        lineItems: {
          edges: {
            node: {
              quantity: number;
              sku: string | null;
              title: string;
              originalTotalSet: { shopMoney: { amount: string } };
            };
          }[];
        };
      };
    }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
};

export async function getShopifyTopProducts(now = new Date(), limit = 5): Promise<ShopifyTopProduct[] | null> {
  const sinceIso = startOfDayIso(shiftDays(now, -7));
  const all: LineItemsPage['orders']['edges'] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 6; i++) {
    const data: LineItemsPage | null = await shopifyGraphQL<LineItemsPage>(
      `query OrdersWithItems($q: String!, $cursor: String) {
         orders(first: 50, query: $q, after: $cursor, sortKey: CREATED_AT, reverse: true) {
           edges { node {
             id createdAt cancelledAt displayFinancialStatus displayFulfillmentStatus
             lineItems(first: 20) {
               edges { node { quantity sku title originalTotalSet { shopMoney { amount } } } }
             }
           } }
           pageInfo { hasNextPage endCursor }
         }
       }`,
      { q: `created_at:>=${sinceIso}`, cursor },
    );
    if (!data) return null;
    all.push(...data.orders.edges);
    if (!data.orders.pageInfo.hasNextPage) break;
    cursor = data.orders.pageInfo.endCursor;
    if (!cursor) break;
  }

  type Agg = { name: string; sold: number; revenue: number; refundedOrCancelled: number; total: number };
  const bySku: Record<string, Agg> = {};
  for (const { node } of all) {
    const cancelled = Boolean(node.cancelledAt);
    const refunded = node.displayFinancialStatus === 'REFUNDED' || node.displayFinancialStatus === 'PARTIALLY_REFUNDED';
    for (const li of node.lineItems.edges) {
      const sku = li.node.sku || li.node.title;
      const entry: Agg = bySku[sku] ?? (bySku[sku] = {
        name: li.node.title,
        sold: 0,
        revenue: 0,
        refundedOrCancelled: 0,
        total: 0,
      });
      entry.sold += li.node.quantity;
      entry.revenue += Number(li.node.originalTotalSet.shopMoney.amount) || 0;
      entry.total += 1;
      if (cancelled || refunded) entry.refundedOrCancelled += 1;
    }
  }
  return Object.entries(bySku)
    .map(([sku, a]) => ({
      sku,
      name: a.name,
      sold: a.sold,
      revenue: a.revenue,
      marginPct: 0, // not derivable from orders alone — needs cost-of-goods. Mock layer fills.
      rtoPct: a.total > 0 ? (a.refundedOrCancelled / a.total) * 100 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}
