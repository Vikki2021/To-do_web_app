// Meta Marketing API fetcher. Server-only.
import 'server-only';
import { env, sources } from './env';

const REVAL = 60;
const API_VERSION = 'v21.0';

async function metaFetch<T>(path: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!sources.meta) return null;
  const qs = new URLSearchParams({ ...params, access_token: env.meta.token! });
  try {
    const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${path}?${qs.toString()}`, {
      next: { revalidate: REVAL },
    });
    if (!res.ok) {
      console.warn(`[meta] HTTP ${res.status} on ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn('[meta] fetch failed:', err);
    return null;
  }
}

// ---------- Account-level KPIs ----------

export type MetaAccountKpi = {
  spend7d: number;
  metaRoasInPlatform: number;
  cpm7d: number;
  ctr7d: number;
};

type Insights<T> = { data: T[] };
type AccountInsightRow = {
  spend?: string;
  purchase_roas?: { action_type: string; value: string }[];
  cpm?: string;
  ctr?: string;
};

export async function getMetaAccountKpi(): Promise<MetaAccountKpi | null> {
  const data = await metaFetch<Insights<AccountInsightRow>>(
    `${env.meta.adAccountId}/insights`,
    {
      date_preset: 'last_7d',
      fields: 'spend,purchase_roas,cpm,ctr',
      level: 'account',
    },
  );
  if (!data) return null;
  // Empty data array is a legitimate "no campaigns running" state, not an error.
  // Return zeros so the dashboard renders cleanly without falling back to mock.
  if (!data.data?.length) {
    return { spend7d: 0, metaRoasInPlatform: 0, cpm7d: 0, ctr7d: 0 };
  }
  const r = data.data[0];
  const purchaseRoas = r.purchase_roas?.find((x) => x.action_type === 'omni_purchase' || x.action_type === 'purchase');
  return {
    spend7d: Number(r.spend ?? 0),
    metaRoasInPlatform: Number(purchaseRoas?.value ?? 0),
    cpm7d: Number(r.cpm ?? 0),
    ctr7d: Number(r.ctr ?? 0),
  };
}

// ---------- Daily spend (for chart overlay) ----------

export async function getMetaDailySpend(): Promise<{ day: string; spend: number }[] | null> {
  const data = await metaFetch<Insights<{ date_start: string; spend?: string }>>(
    `${env.meta.adAccountId}/insights`,
    {
      date_preset: 'last_7d',
      fields: 'spend',
      level: 'account',
      time_increment: '1',
    },
  );
  if (!data) return null;
  // Empty array = no campaigns running; return empty (caller handles).
  return data.data.map((r) => ({
    day: new Date(r.date_start).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    spend: Number(r.spend ?? 0),
  }));
}

// ---------- Top ad sets ----------

export type MetaTopAd = {
  name: string;
  product: string;
  spend: number;
  roas: number;
  ctr: number;
  freq: number;
  status: 'scaling' | 'testing' | 'fatigued' | 'killed';
};

type AdSetInsightRow = {
  adset_id: string;
  adset_name: string;
  spend?: string;
  purchase_roas?: { action_type: string; value: string }[];
  ctr?: string;
  frequency?: string;
};

function classify(roas: number, freq: number): MetaTopAd['status'] {
  if (roas >= 2.5) return 'scaling';
  if (roas >= 1.6) return 'testing';
  if (freq >= 2.5) return 'fatigued';
  if (roas < 1.0) return 'killed';
  return 'testing';
}

export async function getMetaTopAds(limit = 5): Promise<MetaTopAd[] | null> {
  const data = await metaFetch<Insights<AdSetInsightRow>>(`${env.meta.adAccountId}/insights`, {
    date_preset: 'last_7d',
    fields: 'adset_id,adset_name,spend,purchase_roas,ctr,frequency',
    level: 'adset',
    limit: '50',
  });
  if (!data) return null;
  return data.data
    .map((r) => {
      const purchaseRoas = r.purchase_roas?.find((x) => x.action_type === 'omni_purchase' || x.action_type === 'purchase');
      const spend = Number(r.spend ?? 0);
      const roas = Number(purchaseRoas?.value ?? 0);
      const ctr = Number(r.ctr ?? 0);
      const freq = Number(r.frequency ?? 0);
      const skuMatch = r.adset_name.match(/^([A-Z]{2,3}-\d{3})/);
      return {
        name: r.adset_name,
        product: skuMatch ? skuMatch[1] : '—',
        spend,
        roas,
        ctr,
        freq,
        status: classify(roas, freq),
      };
    })
    .sort((a, b) => b.spend - a.spend)
    .slice(0, limit);
}
