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
| Strategy | `performance-coach` | Weekly health score, pattern detection, next-week priority plan |
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
- **Warm up new ad account** → `ad-account-warmup.md` — 7-day trust build for fresh/reinstated Meta ad accounts before scale-spend

## Quick Commands (plain English → agent)

| What you say | What runs |
|---|---|
| "Run daily ops" / "morning routine" | `daily-ops.md` playbook (all agents) |
| "What did we make yesterday?" | `marketing-analytics` |
| "How's the business?" / "weekly review" | `performance-coach` + `weekly-review.md` |
| "Reply to today's customer emails" | `customer-support` |
| "Launch [product]" | `launch-product.md` playbook |
| "Is [product] launch-ready?" | `launch-ready` skill via `ads-manager` |
| "Scale [product]" | `scale-winner.md` playbook |
| "Kill [product/ad]" | `kill-loser.md` playbook |
| "Top winning products from my store" | `product-research` |
| "Spy on [competitor store URL]" | `competitor-spy` |
| "Build ad creatives for [product]" | `creative-studio` + `india-localizer` |
| "Check inventory" | `inventory-planner` |
| "Fix my tracking" / "pixel broken" | `pixel-doctor` |
| "Reduce my RTO" | `rto-prevention` skill + `customer-support` |
| "Check my engagement campaign" | `ads-manager` |
| "What's the festival window?" | `india-localizer` |
| "Log today's KPIs to Notion" | `ops-planner` |
| "Restock [SKU]" | `inventory-planner` (flags for operator Dropdash action) |
| "COD verification for today" | `cod-verification-daily.md` playbook |
| "Reframe this video to all placements" | `creative-studio` → Higgsfield `reframe` (9:16 → 4:5 + 1:1) |
| "Deep-research this niche" | `product-research` + `deep-research` skill |
| "Auto-run daily ops every morning" | `loop` skill at 24h interval |
| "Verify the checkout works" | `verify` skill drives a live test order |
| "Audit my harness changes" | `code-review` / `security-review` skill |

## Operator interaction model

You (the operator) talk to Claude in plain English. Claude routes to the right
subagent automatically. Examples that work without naming an agent:

- "What did we make yesterday?" → `marketing-analytics`
- "How's the business this week?" → `performance-coach`
- "Reply to today's customer emails" → `customer-support`
- "Launch the neck massager I added to Notion" → orchestrates 4 agents
- "Pause anything below 1.2 ROAS over 3 days" → `ads-manager`
- "Build me 6 ad variants for SKU NM-001 in Hinglish" → `creative-studio` + `india-localizer`
- "Reduce my RTO — it's 38%" → `rto-prevention` skill + `customer-support` + `ads-manager`
- "Is the heating pad ready to launch?" → `launch-ready` skill

## Decision rules live in skills

Every threshold (ROAS to scale, days before pause, margin minimums, festival
windows) lives in `.claude/skills/` so the rules are versioned, auditable, and
swappable. **Do not hardcode numbers in agent prompts.** Reference the skill.

- `winning-product-criteria` — what counts as a winning product
- `unit-economics` — BEC model, Target CPP (8% of SP), breakeven, Product Arsenal schema
- `ad-scaling-rules` — concrete scale/maintain/kill rules
- `creative-brief` — brief template every creative must satisfy
- `conversion-page-blueprint` — product/home page anatomy, buying psychology, page checklists
- `indian-dropshipping` — India-specific playbook (COD, GST, RTO, regional)
- `inventory-thresholds` — reorder points, festival multipliers, dead-stock rules
- `whatsapp-templates` — Hinglish + English templates for every customer-facing intent
- `launch-ready` — pre-launch validation gate (7 domains, GREEN/YELLOW/RED verdict)
- `rto-prevention` — RTO reduction tactics (verification tiers, pincode blocking, prepaid conversion)

## Claude Code system skills wired into the harness

These are first-party Claude Code skills (not business skills) that agents and the operator can invoke:

| Skill | Used by | When |
|---|---|---|
| `deep-research` | `product-research`, `competitor-spy` | Thin-evidence niches — fan out across 10+ web sources with fact-checking |
| `loop` | `ops-planner` | Auto-run `daily-ops.md` at 24h interval when operator unavailable |
| `verify` | `launch-ready` (S1 check), `pixel-doctor` | Drive the live store in a real browser to confirm checkout works |
| `update-config` | Operator | Add hooks, permissions, env vars to `.claude/settings.json` without hand-editing |
| `fewer-permission-prompts` | Operator (monthly) | Scan transcripts → expand the allow list to cut prompts |
| `code-review` / `simplify` | Operator | Quality pass on changes to the harness itself (agents, skills, playbooks) |
| `security-review` | Operator (before pushing harness changes) | Audit the diff for risky permissions or leaked credentials |

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
