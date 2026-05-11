// Unified data layer. Server-only. Each section prefers live data,
// falls back to mock when a source is missing or returns null.
import 'server-only';
import { sources } from './env';
import {
  kpis as mockKpis,
  revenue7d as mockRevenue7d,
  topProducts as mockTopProducts,
  topAds as mockTopAds,
  upcomingFestivals as mockFestivals,
  activity as mockActivity,
  type ActivityEvent,
  type FestivalEvent,
  type TopAd,
  type TopProduct,
} from '@/data/mock';
import { getShopifySalesSummary, getShopifyDailyRevenue, getShopifyTopProducts } from './shopify';
import { getMetaAccountKpi, getMetaDailySpend, getMetaTopAds } from './meta';
import { getNotionFestivalCalendar, getNotionActivityFeed } from './notion';

export type DashboardKpis = {
  revenueToday: number;
  revenueYesterday: number;
  revenue7dAvg: number;
  spend7d: number;
  blendedRoas: number;
  breakEvenRoas: number;
  metaRoasInPlatform: number;
  rtoPctTrailing14d: number;
  aov: number;
  cvr: number;
  newCustomersToday: number;
  ordersToday: number;
  pendingCodConfirmations: number;
  supportInboxOpen: number;
  activeCampaigns: number;
};

export type DashboardData = {
  kpis: DashboardKpis;
  revenue7d: { day: string; revenue: number; spend: number }[];
  topProducts: TopProduct[];
  topAds: TopAd[];
  festivals: FestivalEvent[];
  activity: ActivityEvent[];
  liveSources: {
    shopify: boolean;
    meta: boolean;
    notion: boolean;
  };
  sourceErrors: {
    shopify: string | null;
    meta: string | null;
    notion: string | null;
  };
};

export async function getDashboardData(): Promise<DashboardData> {
  const [shopifySummary, shopifyDaily, shopifyTop, metaKpi, metaDaily, metaTop, festivals, activity] =
    await Promise.all([
      getShopifySalesSummary(),
      getShopifyDailyRevenue(),
      getShopifyTopProducts(),
      getMetaAccountKpi(),
      getMetaDailySpend(),
      getMetaTopAds(),
      getNotionFestivalCalendar(),
      getNotionActivityFeed(),
    ]);

  // KPIs
  const kpis: DashboardKpis = {
    revenueToday: shopifySummary?.todayRevenue ?? mockKpis.revenueToday,
    revenueYesterday: shopifySummary?.yesterdayRevenue ?? mockKpis.revenueYesterday,
    revenue7dAvg: shopifySummary?.avg7dRevenue ?? mockKpis.revenue7dAvg,
    spend7d: metaKpi?.spend7d ?? mockKpis.spend7d,
    breakEvenRoas: mockKpis.breakEvenRoas, // operator-defined, not API-derivable
    metaRoasInPlatform: metaKpi?.metaRoasInPlatform ?? mockKpis.metaRoasInPlatform,
    blendedRoas: 0, // computed below
    rtoPctTrailing14d: shopifySummary?.rtoPctTrailing14d ?? mockKpis.rtoPctTrailing14d,
    aov: shopifySummary?.aov ?? mockKpis.aov,
    cvr: mockKpis.cvr, // GA4 not wired yet
    newCustomersToday: shopifySummary?.newCustomersToday ?? mockKpis.newCustomersToday,
    ordersToday: shopifySummary?.ordersToday ?? mockKpis.ordersToday,
    pendingCodConfirmations: mockKpis.pendingCodConfirmations,
    supportInboxOpen: mockKpis.supportInboxOpen,
    activeCampaigns: mockKpis.activeCampaigns,
  };
  const last7Revenue = (shopifySummary?.avg7dRevenue ?? mockKpis.revenue7dAvg) * 7;
  kpis.blendedRoas = kpis.spend7d > 0 ? last7Revenue / kpis.spend7d : mockKpis.blendedRoas;

  // 7-day combined chart
  let revenue7d = mockRevenue7d;
  if (shopifyDaily) {
    const spendMap = new Map(metaDaily?.map((d) => [d.day, d.spend]) ?? []);
    revenue7d = shopifyDaily.map((d) => ({
      day: d.day,
      revenue: d.revenue,
      spend: spendMap.get(d.day) ?? 0,
    }));
  }

  // Tables — only swap if live returned non-empty
  const topProducts =
    shopifyTop && shopifyTop.length > 0
      ? shopifyTop.map((p) => ({
          ...p,
          marginPct: mockTopProducts.find((m) => m.sku === p.sku)?.marginPct ?? 50,
        }))
      : mockTopProducts;

  const topAds = metaTop && metaTop.length > 0 ? metaTop : mockTopAds;
  const festivalsOut = festivals && festivals.length > 0 ? festivals : mockFestivals;
  const activityOut = activity && activity.length > 0 ? activity : mockActivity;

  // Detect configured-but-failing sources. A "configured" source whose fetch
  // returned null almost certainly hit an auth/network error — surface it.
  const sourceErrors = {
    shopify:
      sources.shopify && !shopifySummary
        ? 'Configured but fetch returned no data. Likely auth failure (401) — verify SHOPIFY_ADMIN_TOKEN. Check Vercel runtime logs for the exact error.'
        : null,
    meta:
      sources.meta && !metaKpi
        ? 'Configured but fetch returned no data. Likely auth failure or insufficient scopes — verify META_ACCESS_TOKEN has ads_read + ads_management.'
        : null,
    notion:
      sources.notion.festival && !festivals
        ? 'Configured but fetch returned no data. Most likely the Dropshipping Ops page is not shared with the integration. Open the page → Connections → Add the integration.'
        : null,
  };

  return {
    kpis,
    revenue7d,
    topProducts,
    topAds,
    festivals: festivalsOut,
    activity: activityOut,
    liveSources: {
      shopify: sources.shopify && Boolean(shopifySummary),
      meta: sources.meta && Boolean(metaKpi),
      notion: sources.notion.festival && Boolean(festivals),
    },
    sourceErrors,
  };
}
