# Dropshipping Automation Harness

This repo is the operations center for an Indian dropshipping (Shopify) business.
It is **not** a web app. It is a Claude Code harness: subagents, skills, playbooks,
and settings that let one operator run every pillar of the business through Claude.

## Pillars and owning agents

| Pillar | Agent | What it owns |
|---|---|---|
| Product research | `product-research` | Find winning products, score against criteria, brief launches |
| Store operations | `store-manager` | Shopify products, collections, inventory, discounts |
| Creative | `creative-studio` | Higgsfield + Canva ad creatives and product imagery |
| Paid ads | `ads-manager` | Meta Ads campaigns, scaling rules, kill rules, budgets |
| Analytics | `marketing-analytics` | Supermetrics + Windsor cross-channel KPIs and anomaly alerts |
| Customer support | `customer-support` | Gmail triage, order lookup, refund/COD/RTO handling |
| Outbound email/WA | `email-marketer` | Abandoned cart, post-purchase, win-back, festival broadcasts |
| Order fulfillment | `order-fulfillment` | Order status, tracking emails, NDR/RTO chase |
| Inventory | `inventory-planner` | Reorder timing, festival stock, dead-stock, Dropdash drift |
| Tracking health | `pixel-doctor` | Meta Pixel + CAPI diagnosis, dataset quality, attribution gaps |
| Competitor intel | `competitor-spy` | Rival store UI / catalog / pricing / ads / apps dossiers — analysis only, never cloning |
| Planning & SOPs | `ops-planner` | Notion SOP library, Calendar launches, weekly reviews |
| India localization | `india-localizer` | Cross-cuts every pillar — COD, GST, regional copy, festivals |

## Connectors used

- **Shopify** — store ops, products, orders, inventory, ShopifyQL analytics
- **Meta Ads** — campaigns, ad sets, ads, insights, benchmarks, opportunity score
- **Supermetrics** — 150+ marketing data sources (Meta, Google, TikTok, GA4, etc.)
- **Windsor.ai** — alternative cross-channel attribution
- **Higgsfield** — image and video generation for ads/UGC-style creatives
- **Canva** — branded designs, banners, listing imagery
- **Notion** — product database, SOPs, launch trackers
- **Gmail** — customer email triage and outbound
- **Google Calendar** — launch calendar, festival sales, content schedule
- **Google Drive** — creative asset library
- **Vercel** — landing-page deploys (advertorials, pre-launch pages)
- **GitHub** — version control for this harness

## Default workflows

Run the right playbook from `.claude/playbooks/`:

- **Daily** → `daily-ops.md` — every morning, ~15 minutes of operator review
- **COD verify** → `cod-verification-daily.md` — every morning, confirm COD orders before dispatch
- **Weekly** → `weekly-review.md` — Friday close-out and next-week plan
- **Launch a product** → `launch-product.md` — research → store → creative → ads → monitor
- **Festival sale** → `festival-sale.md` — India festival calendar push (Diwali, Raksha Bandhan, etc.)
- **Scale a winner** → `scale-winner.md` — when a product hits ROAS thresholds
- **Kill a loser** → `kill-loser.md` — when products/ads breach kill rules

## Operator interaction model

You (the operator) talk to Claude in plain English. Claude routes to the right
subagent automatically. Examples that work without naming an agent:

- "What did we make yesterday?" → `marketing-analytics`
- "Reply to today's customer emails" → `customer-support`
- "Launch the neck massager I added to Notion" → orchestrates 4 agents
- "Pause anything below 1.2 ROAS over 3 days" → `ads-manager`
- "Build me 6 ad variants for SKU NM-001 in Hinglish" → `creative-studio` + `india-localizer`

## Decision rules live in skills

Every threshold (ROAS to scale, days before pause, margin minimums, festival
windows) lives in `.claude/skills/` so the rules are versioned, auditable, and
swappable. **Do not hardcode numbers in agent prompts.** Reference the skill.

- `winning-product-criteria` — what counts as a winning product
- `ad-scaling-rules` — concrete scale/maintain/kill rules
- `creative-brief` — brief template every creative must satisfy
- `conversion-page-blueprint` — product/home page anatomy, buying psychology, page checklists
- `indian-dropshipping` — India-specific playbook (COD, GST, RTO, regional)
- `inventory-thresholds` — reorder points, festival multipliers, dead-stock rules
- `whatsapp-templates` — Hinglish + English templates for every customer-facing intent

## Safety defaults

- Budget changes >25% in one move require operator confirmation
- Pausing > 5 ads at once requires operator confirmation
- Sending bulk customer email (>20 recipients) requires operator confirmation
- Spend caps per ad set are stored in `docs/limits.md` — never exceed without approval
- **Products are pushed into Shopify via the Dropdash app, not by `store-manager` directly**. `store-manager` enriches Dropdash-pushed shells (descriptions, metafields, tags, compare-at, SEO) — it does not call `create-product` to spawn new SKUs unless the operator explicitly says "create directly". See `store-manager.md` and `launch-product.md` for the two-step flow.

## Adding a new pillar

1. Create `.claude/agents/<name>.md` with frontmatter (`name`, `description`, `model`)
2. If it has decision logic, put thresholds in a new `.claude/skills/<name>/SKILL.md`
3. Add it to the pillar table above
4. Wire it into relevant playbooks
