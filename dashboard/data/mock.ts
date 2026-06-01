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
  'performance-coach': { icon: 'Gauge', accent: 'teal', tagline: 'Weekly health score + patterns' },
  'email-marketer': { icon: 'Mail', accent: 'cream', tagline: 'Abandoned cart + win-back flows' },
  'inventory-planner': { icon: 'Boxes', accent: 'saffron', tagline: 'Reorder + festival multipliers' },
  'pixel-doctor': { icon: 'Activity', accent: 'teal', tagline: 'Meta Pixel + CAPI diagnosis' },
  'competitor-spy': { icon: 'Eye', accent: 'cream', tagline: 'Rival dossiers · analysis only' },
};

// --- Performance coach: 5-dimension health score ---
export type HealthDimension = {
  key: 'acquisition' | 'conversion' | 'retention' | 'operations' | 'infrastructure';
  label: string;
  score: number; // 0-20
  notes: string;
};

export type HealthScore = {
  total: number;       // 0-100
  trend: 'up' | 'down' | 'flat';
  deltaWoW: number;    // delta vs last week
  dimensions: HealthDimension[];
};

export const healthScore: HealthScore = {
  total: 64,
  trend: 'up',
  deltaWoW: 6,
  dimensions: [
    { key: 'acquisition',    label: 'Acquisition',    score: 11, notes: 'ROAS 2.34x · 7 campaigns · CPM stable' },
    { key: 'conversion',     label: 'Conversion',     score: 12, notes: 'CVR 1.92% · AOV ₹1,184 · checkout solid' },
    { key: 'retention',      label: 'Retention',      score:  9, notes: '32% repeat · winback flow drafted' },
    { key: 'operations',     label: 'Operations',     score: 17, notes: 'Dropdash live · NDR <10% · 94 shipped' },
    { key: 'infrastructure', label: 'Infrastructure', score: 15, notes: 'Pixel EMQ 6.4 · CAPI OK · Notion synced' },
  ],
};

// --- Launch-Ready Gate (7 domains) ---
export type LaunchDomain = {
  key: string;
  label: string;
  pass: number;       // checks passing
  total: number;      // total checks
  verdict: 'green' | 'yellow' | 'red';
  blockers: string[]; // RED items only
};

export type LaunchReadiness = {
  product: string;
  productHandle: string;
  verdict: 'green' | 'yellow' | 'red';
  domains: LaunchDomain[];
  etaToFix: string;
};

export const launchReadiness: LaunchReadiness = {
  product: 'Cordless Menstrual Heating Pad',
  productHandle: 'cordless-menstrual-heating-pad',
  verdict: 'red',
  etaToFix: '4-6 hours',
  domains: [
    { key: 'tracking',    label: 'Tracking',    pass: 0, total: 6, verdict: 'red',    blockers: ['Pixel EMQ unverified (Meta MCP OAuth expired)', 'Meta↔Shopify revenue reconciliation pending'] },
    { key: 'store',       label: 'Store',       pass: 2, total: 9, verdict: 'red',    blockers: ['Live checkout test not done — 65 sessions, 0 checkouts'] },
    { key: 'inventory',   label: 'Inventory',   pass: 3, total: 4, verdict: 'green',  blockers: [] },
    { key: 'creative',    label: 'Creative',    pass: 2, total: 8, verdict: 'red',    blockers: ['No creative brief for Heating Pad', 'No compliance review on creatives'] },
    { key: 'campaign',    label: 'Campaign',    pass: 0, total: 9, verdict: 'yellow', blockers: [] },
    { key: 'economics',   label: 'Economics',   pass: 2, total: 4, verdict: 'yellow', blockers: [] },
    { key: 'fulfillment', label: 'Fulfillment', pass: 1, total: 4, verdict: 'yellow', blockers: [] },
  ],
};

// --- Ad account warmup tracker ---
export type Warmup = {
  active: boolean;
  day: number;
  maxDays: number;
  spendToday: number;
  spendCap: number;
  purchases: number;
  purchaseTarget: number;
  emq: number;
  emqTarget: number;
  strikes: number;
  status: 'ON TRACK' | 'DRIFT' | 'HALT';
};

export const warmup: Warmup = {
  active: true,
  day: 3,
  maxDays: 7,
  spendToday: 842,
  spendCap: 1000,
  purchases: 2,
  purchaseTarget: 5,
  emq: 6.4,
  emqTarget: 6.0,
  strikes: 0,
  status: 'ON TRACK',
};

// --- COD verification / RTO ladder ---
export type RtoTier = {
  key: 'A' | 'B' | 'C';
  label: string;
  threshold: string;
  count: number;
  cancelledNoReply: number;
};

export type RtoLadder = {
  rtoRate7d: number;       // %
  target: number;          // %
  tiers: RtoTier[];
};

export const rtoLadder: RtoLadder = {
  rtoRate7d: 23.4,
  target: 20,
  tiers: [
    { key: 'A', label: 'Tier A · Email confirm', threshold: '≤ ₹999',     count: 18, cancelledNoReply: 2 },
    { key: 'B', label: 'Tier B · Email + WhatsApp', threshold: '₹999–1999', count: 9,  cancelledNoReply: 1 },
    { key: 'C', label: 'Tier C · Phone call YES', threshold: '> ₹1999',    count: 3,  cancelledNoReply: 0 },
  ],
};

// --- Action queue (operator's priority list) ---
export type ActionPriority = 'red' | 'yellow' | 'info';
export type ActionItem = {
  id: string;
  priority: ActionPriority;
  task: string;
  owner: string;
  eta: string;
  prompt?: string; // optional Claude Code command to copy
};

export const actionQueue: ActionItem[] = [
  { id: 'a1', priority: 'red',    task: 'Reconnect Meta Ads MCP OAuth',                     owner: 'operator',       eta: '15 min', prompt: 'Open Claude Code settings → MCP Servers → Meta Ads → Reconnect' },
  { id: 'a2', priority: 'red',    task: 'Confirm Heating Pad landed cost (Dropdash invoice)', owner: 'operator',     eta: '5 min' },
  { id: 'a3', priority: 'red',    task: 'Live checkout test on Heating Pad PDP',             owner: 'operator',       eta: '10 min', prompt: 'Verify the checkout works on the Heating Pad product page.' },
  { id: 'a4', priority: 'yellow', task: 'Fix Heating Pad product page (compare-at, COD badge, slug, description)', owner: 'store-manager',  eta: '30 min', prompt: 'Enrich the Heating Pad product page — set compareAt ₹1,679, add COD badge, fix handle, rewrite description per conversion-page-blueprint skill.' },
  { id: 'a5', priority: 'yellow', task: 'Brief creative-studio with 3 angles (freedom / contrast / social proof)', owner: 'creative-studio', eta: 'async', prompt: 'Build 3-angle creative brief for Heating Pad: freedom angle, contrast angle, social proof. Hinglish, UGC, 9:16 master + reframe to 4:5 + 1:1.' },
  { id: 'a6', priority: 'yellow', task: 'Emergency restock Neck Fan to 150u via Dropdash',   owner: 'operator',       eta: '5 min' },
];

// --- Seasonal urgency (windows + days remaining) ---
export type SeasonalAlert = {
  product: string;
  window: 'cooling' | 'monsoon' | 'festival' | 'winter';
  daysRemaining: number;
  campaignLive: boolean;
};

// ─── SKU Economics (BEC tracker) ────────────────────────────────────────────

export type SkuEcon = {
  sku: string;
  name: string;
  sp: number;
  lc: number;
  actualCpp: number | null;
  campaignStatus: 'live' | 'paused' | 'draft';
};

export const skuEconomics: SkuEcon[] = [
  { sku: 'HP-023',  name: 'Cordless Menstrual Heating Pad', sp: 1199, lc: 300, actualCpp: null,  campaignStatus: 'draft' },
  { sku: 'NM-001',  name: 'Portable Neck Massager',          sp: 799,  lc: 185, actualCpp: 58,    campaignStatus: 'live' },
  { sku: 'KG-007',  name: 'One-Press Garlic Crusher',         sp: 599,  lc: 140, actualCpp: 42,    campaignStatus: 'live' },
  { sku: 'HM-012',  name: 'Magnetic Phone Holder',            sp: 699,  lc: 160, actualCpp: 61,    campaignStatus: 'live' },
  { sku: 'BD-004',  name: 'Beard Roller Kit',                 sp: 799,  lc: 210, actualCpp: 87,    campaignStatus: 'live' },
  { sku: 'KT-019',  name: 'Insulated Lunchbox 1.2L',          sp: 799,  lc: 220, actualCpp: 112,   campaignStatus: 'paused' },
];

export const seasonalAlerts: SeasonalAlert[] = [
  { product: 'Neck Fan',       window: 'cooling',  daysRemaining: 18, campaignLive: false },
  { product: 'Spray Desk Fan', window: 'cooling',  daysRemaining: 18, campaignLive: false },
  { product: 'Heating Pad',    window: 'festival', daysRemaining: 999, campaignLive: false },
];
