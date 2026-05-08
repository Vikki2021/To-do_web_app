// Typed env access. Server-only — never import from client components.
import 'server-only';

function get(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() !== '' ? v.trim() : undefined;
}

export const env = {
  shopify: {
    domain: get('SHOPIFY_STORE_DOMAIN'),
    token: get('SHOPIFY_ADMIN_TOKEN'),
    apiVersion: get('SHOPIFY_API_VERSION') ?? '2024-10',
  },
  meta: {
    token: get('META_ACCESS_TOKEN'),
    adAccountId: get('META_AD_ACCOUNT_ID'),
  },
  notion: {
    token: get('NOTION_TOKEN'),
    festivalDb: get('NOTION_DB_FESTIVAL_CALENDAR'),
    dailyStandupDb: get('NOTION_DB_DAILY_STANDUP'),
    launchesDb: get('NOTION_DB_LAUNCHES'),
  },
  revalidate: Number(get('DASHBOARD_REVALIDATE') ?? '60'),
} as const;

export const sources = {
  shopify: Boolean(env.shopify.domain && env.shopify.token),
  meta: Boolean(env.meta.token && env.meta.adAccountId),
  notion: {
    festival: Boolean(env.notion.token && env.notion.festivalDb),
    standup: Boolean(env.notion.token && env.notion.dailyStandupDb),
    launches: Boolean(env.notion.token && env.notion.launchesDb),
  },
};

export const allLive =
  sources.shopify && sources.meta && sources.notion.festival;

export const anyLive =
  sources.shopify ||
  sources.meta ||
  sources.notion.festival ||
  sources.notion.standup ||
  sources.notion.launches;
