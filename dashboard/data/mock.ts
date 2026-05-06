// Realistic mock dataset for the dashboard demo mode.
// Numbers are fictional but tuned to a mid-scale Indian dropshipping store.

export type AgentStatus = 'idle' | 'running' | 'attention' | 'ok';

export type AgentRuntime = {
  slug: string;
  status: AgentStatus;
  lastRunIso: string;
  primaryMetric: { label: string; value: string; sub?: string };
  decisionsToday: number;
};

export const today = new Date('2026-05-05T09:30:00+05:30');

export const kpis = {
  revenueToday: 142_300,
  revenueYesterday: 318_750,
  revenue7dAvg: 286_440,
  spend7d: 612_400,
  blendedRoas: 2.34,
  breakEvenRoas: 1.6,
  metaRoasInPlatform: 3.12,
  rtoPctTrailing14d: 23.4,
  aov: 1_184,
  cvr: 1.92,
  newCustomersToday: 87,
  ordersToday: 116,
  pendingCodConfirmations: 14,
  supportInboxOpen: 9,
  activeCampaigns: 7,
};

export const revenue7d: { day: string; revenue: number; spend: number }[] = [
  { day: 'Apr 28', revenue: 248_900, spend: 92_500 },
  { day: 'Apr 29', revenue: 275_320, spend: 95_100 },
  { day: 'Apr 30', revenue: 232_100, spend: 88_400 },
  { day: 'May 1', revenue: 301_980, spend: 96_300 },
  { day: 'May 2', revenue: 357_600, spend: 102_800 },
  { day: 'May 3', revenue: 290_440, spend: 89_200 },
  { day: 'May 4', revenue: 318_750, spend: 91_700 },
];

export const agents: AgentRuntime[] = [
  {
    slug: 'product-research',
    status: 'idle',
    lastRunIso: '2026-05-04T18:42:00+05:30',
    primaryMetric: { label: 'Pipeline candidates', value: '12', sub: '3 GO • 6 HOLD • 3 KILL' },
    decisionsToday: 0,
  },
  {
    slug: 'store-manager',
    status: 'ok',
    lastRunIso: '2026-05-05T08:14:00+05:30',
    primaryMetric: { label: 'Live SKUs', value: '38', sub: '2 published this week' },
    decisionsToday: 2,
  },
  {
    slug: 'creative-studio',
    status: 'attention',
    lastRunIso: '2026-05-05T07:55:00+05:30',
    primaryMetric: { label: 'Refresh queue', value: '4', sub: 'fatigue ≥ 2.5x' },
    decisionsToday: 1,
  },
  {
    slug: 'ads-manager',
    status: 'running',
    lastRunIso: '2026-05-05T09:21:00+05:30',
    primaryMetric: { label: 'Active campaigns', value: '7', sub: '3 scaling • 2 testing • 2 RT' },
    decisionsToday: 5,
  },
  {
    slug: 'marketing-analytics',
    status: 'ok',
    lastRunIso: '2026-05-05T09:30:00+05:30',
    primaryMetric: { label: 'Blended ROAS', value: '2.34x', sub: 'BE 1.6x · gap +46%' },
    decisionsToday: 1,
  },
  {
    slug: 'customer-support',
    status: 'attention',
    lastRunIso: '2026-05-05T09:11:00+05:30',
    primaryMetric: { label: 'Open threads', value: '9', sub: '4 cs/order-status • 3 cs/cod-confirm' },
    decisionsToday: 12,
  },
  {
    slug: 'order-fulfillment',
    status: 'ok',
    lastRunIso: '2026-05-05T08:30:00+05:30',
    primaryMetric: { label: 'Today shipped', value: '94', sub: '14 awaiting COD confirm' },
    decisionsToday: 8,
  },
  {
    slug: 'ops-planner',
    status: 'idle',
    lastRunIso: '2026-05-04T17:00:00+05:30',
    primaryMetric: { label: 'Launches this wk', value: '2', sub: 'NM-001 day-7 review tmrw' },
    decisionsToday: 0,
  },
  {
    slug: 'india-localizer',
    status: 'ok',
    lastRunIso: '2026-05-05T09:05:00+05:30',
    primaryMetric: { label: 'Festival horizon', value: '14d', sub: 'Holi-recap → Mother’s Day' },
    decisionsToday: 3,
  },
];

export type ActivityEvent = {
  ts: string;
  agent: string;
  kind: 'decision' | 'alert' | 'run' | 'handoff';
  text: string;
};

export const activity: ActivityEvent[] = [
  {
    ts: '2026-05-05T09:30:00+05:30',
    agent: 'marketing-analytics',
    kind: 'run',
    text: 'Daily report posted. Blended ROAS 2.34x — within scaling band.',
  },
  {
    ts: '2026-05-05T09:24:00+05:30',
    agent: 'ads-manager',
    kind: 'decision',
    text: 'Auto-scaled NM-001 / "Problem-UGC-A1" ad set +20% (₹6,000 → ₹7,200/day).',
  },
  {
    ts: '2026-05-05T09:21:00+05:30',
    agent: 'ads-manager',
    kind: 'alert',
    text: 'Frequency 2.7x on "Studio-Hindi-B2" — flagged for creative refresh.',
  },
  {
    ts: '2026-05-05T09:11:00+05:30',
    agent: 'customer-support',
    kind: 'decision',
    text: 'Drafted 9 replies (4 order-status, 3 COD-confirm, 2 refund). Awaiting approval.',
  },
  {
    ts: '2026-05-05T09:05:00+05:30',
    agent: 'india-localizer',
    kind: 'handoff',
    text: 'Hinglish overlays approved for NM-001 Reels variants 1-3.',
  },
  {
    ts: '2026-05-05T08:30:00+05:30',
    agent: 'order-fulfillment',
    kind: 'run',
    text: '94 fulfillments pushed to Shiprocket. 14 COD orders awaiting confirmation.',
  },
  {
    ts: '2026-05-05T08:14:00+05:30',
    agent: 'store-manager',
    kind: 'decision',
    text: 'Inventory bumped on KG-007 (52 → 200). RTO_risk metafield set "low".',
  },
  {
    ts: '2026-05-05T07:55:00+05:30',
    agent: 'creative-studio',
    kind: 'alert',
    text: '4 ads in refresh queue. Brief auto-drafted, awaiting Higgsfield run.',
  },
];

export type TopProduct = {
  sku: string;
  name: string;
  sold: number;
  revenue: number;
  marginPct: number;
  rtoPct: number;
};

export const topProducts: TopProduct[] = [
  { sku: 'NM-001', name: 'Portable Neck Massager', sold: 41, revenue: 32_800, marginPct: 58, rtoPct: 19 },
  { sku: 'KG-007', name: 'One-Press Garlic Crusher', sold: 36, revenue: 21_564, marginPct: 64, rtoPct: 16 },
  { sku: 'HM-012', name: 'Magnetic Phone Holder', sold: 28, revenue: 19_872, marginPct: 52, rtoPct: 22 },
  { sku: 'BD-004', name: 'Beard Roller Kit', sold: 22, revenue: 17_578, marginPct: 49, rtoPct: 28 },
  { sku: 'KT-019', name: 'Insulated Lunchbox 1.2L', sold: 19, revenue: 15_181, marginPct: 41, rtoPct: 24 },
];

export type TopAd = {
  name: string;
  product: string;
  spend: number;
  roas: number;
  ctr: number;
  freq: number;
  status: 'scaling' | 'testing' | 'fatigued' | 'killed';
};

export const topAds: TopAd[] = [
  { name: 'NM-001 / Problem-UGC-A1', product: 'NM-001', spend: 7_200, roas: 4.18, ctr: 2.1, freq: 1.4, status: 'scaling' },
  { name: 'KG-007 / Demo-Kitchen-B3', product: 'KG-007', spend: 4_500, roas: 3.74, ctr: 1.9, freq: 1.6, status: 'scaling' },
  { name: 'HM-012 / Meme-C2', product: 'HM-012', spend: 2_800, roas: 2.31, ctr: 1.4, freq: 1.2, status: 'testing' },
  { name: 'BD-004 / Authority-D1', product: 'BD-004', spend: 3_100, roas: 1.42, ctr: 0.9, freq: 2.7, status: 'fatigued' },
  { name: 'KT-019 / Lifestyle-E2', product: 'KT-019', spend: 1_900, roas: 1.05, ctr: 0.7, freq: 2.3, status: 'killed' },
];

export type FestivalEvent = {
  date: string;
  name: string;
  pillarTypes: string;
  prep: 'T-21' | 'T-14' | 'T-7' | 'T-3' | 'T-0';
};

export const upcomingFestivals: FestivalEvent[] = [
  { date: '2026-05-10', name: 'Mother’s Day', pillarTypes: 'gifting, beauty', prep: 'T-7' },
  { date: '2026-06-21', name: 'International Yoga Day', pillarTypes: 'wellness, fitness', prep: 'T-14' },
  { date: '2026-07-29', name: 'Hariyali Teej', pillarTypes: 'apparel, gifting', prep: 'T-21' },
  { date: '2026-08-15', name: 'Independence Day', pillarTypes: 'broad', prep: 'T-21' },
];

export const playbooks = [
  { slug: 'daily-ops', title: 'Daily Ops', desc: 'Morning 15-minute routine across every pillar.', accent: 'saffron', icon: 'Sunrise' },
  { slug: 'weekly-review', title: 'Weekly Review', desc: 'Friday close-out and next-week plan.', accent: 'teal', icon: 'CalendarRange' },
  { slug: 'launch-product', title: 'Launch Product', desc: 'Research → store → creative → ads → monitor.', accent: 'saffron', icon: 'Rocket' },
  { slug: 'festival-sale', title: 'Festival Sale', desc: 'Diwali, Raksha Bandhan, Holi, more.', accent: 'cream', icon: 'Sparkles' },
  { slug: 'scale-winner', title: 'Scale Winner', desc: 'Winning product hit ROAS thresholds.', accent: 'teal', icon: 'TrendingUp' },
  { slug: 'kill-loser', title: 'Kill Loser', desc: 'Stop the bleed, write the post-mortem.', accent: 'saffron', icon: 'OctagonX' },
];

export const agentMeta: Record<string, { icon: string; accent: string; tagline: string }> = {
  'product-research': { icon: 'Search', accent: 'saffron', tagline: 'Find the next winner' },
  'store-manager': { icon: 'Store', accent: 'teal', tagline: 'Shopify command center' },
  'creative-studio': { icon: 'Camera', accent: 'cream', tagline: 'Higgsfield + Canva ad lab' },
  'ads-manager': { icon: 'Megaphone', accent: 'saffron', tagline: 'Meta Ads, on rails' },
  'marketing-analytics': { icon: 'LineChart', accent: 'teal', tagline: 'Cross-channel truth' },
  'customer-support': { icon: 'MessageCircle', accent: 'cream', tagline: 'Inbox triage + Hinglish replies' },
  'order-fulfillment': { icon: 'Package', accent: 'teal', tagline: 'COD verify, ship, NDR chase' },
  'ops-planner': { icon: 'CalendarDays', accent: 'saffron', tagline: 'Notion, Calendar, Vercel' },
  'india-localizer': { icon: 'Languages', accent: 'cream', tagline: 'Hinglish, COD, RTO, festivals' },
};
