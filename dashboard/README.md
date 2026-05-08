# Dropshipping Dashboard

Operator UI for the dropshipping automation harness in the parent repo.

- 9 agents · 4 skills · 6 playbooks
- Reads agent and playbook markdown straight from `../.claude/`
- **Hybrid data model**: prefers live Shopify + Meta + Notion when env vars are set, falls back to mock data per-section
- Read-only: every action button copies a Claude Code run prompt to your clipboard
- Header badge shows whether each source is `live` or `mock`

## Stack

Next.js 15 · React 19 · Tailwind v3 · Framer Motion · lucide-react · gray-matter.

## Local dev

```bash
cd dashboard
cp .env.example .env.local   # fill in only the vars you have
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` — operator dashboard (KPIs, agents, playbooks, festival rail, top products + ads, activity)
- `/agents` — agent index
- `/agents/[name]` — agent detail (parsed from `.claude/agents/<name>.md`)
- `/playbooks` — playbook index
- `/playbooks/[name]` — playbook detail (parsed from `.claude/playbooks/<name>.md`)

## Live data wiring

The dashboard's data layer (`lib/data.ts`) fans out to three optional sources in parallel and merges with mock data for any section that returns null. You can wire them one at a time — the badge in the header tells you what's live.

| Section | Source | Env vars |
|---|---|---|
| Revenue today/yesterday/7d, AOV, RTO%, orders, top products | Shopify Admin GraphQL | `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_TOKEN` |
| 7-day spend chart, blended ROAS, CPM/CTR, top ad sets | Meta Marketing API | `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID` |
| Festival horizon | Notion API | `NOTION_TOKEN`, `NOTION_DB_FESTIVAL_CALENDAR` |
| Activity feed | Notion API | `NOTION_TOKEN`, `NOTION_DB_DAILY_STANDUP` |

See `.env.example` for full instructions on each.

### What still uses mock when live is on

- `marginPct` per product — needs cost-of-goods, which Shopify doesn't expose by default. Wire to Notion Product Pipeline DB later, or compute from a metafield.
- `cvr` — needs GA4 or a Shopify checkout-funnel query, not yet built.
- `breakEvenRoas` — operator-defined per product; pulled from a future config DB.
- Agent runtime statuses (last run, decisions today) — needs the future "Agent Runs" Notion DB.

### Caching

All live fetches use Next.js ISR with a 60-second revalidation window. Override with `DASHBOARD_REVALIDATE` (seconds; `0` disables caching).

## Deploy

The `dashboard/` folder is a self-contained Next.js app. In Vercel:
1. Import the repo
2. Project Settings → Root Directory → `dashboard`
3. Add the env vars you have (any subset works)
4. Deploy

Push to `main` ships to production; PRs get preview URLs automatically.

## Where the code lives

```
dashboard/
  app/
    layout.tsx              # header + footer shell, reads env-level sources
    page.tsx                # operator dashboard, calls getDashboardData()
    agents/                 # agent index + detail pages (server components)
    playbooks/              # playbook index + detail pages
  components/
    AgentCard, PlaybookCard, KpiCard, RevenueChart, TopProducts, TopAds,
    FestivalRail, ActivityFeed, SourcesBadge, Header, Markdown, ...
  lib/
    env.ts                  # typed env access + sources flags (server-only)
    shopify.ts              # Shopify Admin GraphQL fetcher
    meta.ts                 # Meta Marketing API fetcher
    notion.ts               # Notion API fetcher
    data.ts                 # unified layer with per-section mock fallback
    harness.ts              # markdown loader for .claude/ files
    cn.ts                   # className + INR formatting
  data/
    mock.ts                 # fallback dataset, also the type source of truth
```
