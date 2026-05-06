# Dropshipping Dashboard

Operator UI for the dropshipping automation harness in the parent repo.

- 9 agents · 4 skills · 6 playbooks
- Reads agent and playbook markdown straight from `../.claude/`
- Demo data by default — wire up real Shopify / Meta MCP data in `data/mock.ts` when ready
- Read-only: every action button copies a Claude Code run prompt to your clipboard

## Stack

Next.js 15 · React 19 · Tailwind v3 · Framer Motion · lucide-react · gray-matter.

## Local dev

```bash
cd dashboard
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

## Wiring real data

Replace the mock dataset in `data/mock.ts` with live MCP queries. Suggested split:

| Section | Source |
|---|---|
| Revenue / orders / AOV / RTO | Shopify ShopifyQL |
| Spend / ROAS / CPM / CTR | Meta Ads MCP |
| Cross-channel attribution | Supermetrics / Windsor.ai |
| Activity feed | Notion "Daily Standup Log" DB |
| Festival horizon | Notion "Festival Calendar" DB |
| Agent runtimes | Notion "Agent Runs" log (build this) |

The page-level components are server components, so wiring is just async data-fetching at the top.

## Deploy

The `dashboard/` folder is a self-contained Next.js app — point Vercel at it (Project Settings → Root Directory = `dashboard`).
