# Launch Product Playbook

End-to-end pipeline for launching a new SKU. Default cycle time: 5-7 days from approved brief to live ads.

## Trigger

- Operator says "launch <product>" or "launch the <SKU> from Notion"
- Approved GO from `product-research`

## Stage 1 — Brief lock (Day 0)
**Owner: product-research**

- Final launch brief signed off
- Sample ordered and inspected (no exceptions)
- Margin math verified against current courier rates
- Notion "Product Pipeline" entry → status: Sourced

## Stage 2 — Store build (Day 1-2, parallel with Stage 3)
**Owner: operator (Dropdash push) → store-manager (enrichment)**

**Important — current source-of-truth policy:** Products are pushed into Shopify via the **Dropdash** app, not by `store-manager` directly. Two-step flow:

1. **Operator adds the SKU to Dropdash** (operator-only action, outside the harness). Dropdash pushes a product shell into Shopify with vendor `Dropdash`, a placeholder description, and an auto-generated handle.
2. **Then `store-manager` enriches the Dropdash-pushed shell**:
   - Replace the placeholder description with the full structured copy (Hook → benefits → How it works → specs → Shipping & COD → Returns)
   - Correct product type and tags (note: Dropdash may overwrite these on next sync; monitor `updatedAt` and re-apply if needed)
   - Set `cod_eligible`, `rto_risk`, `angle` metafields per `india-localizer` advice
   - Set compare-at price (typically 1.5× sell, rounded to 10s)
   - Write SEO title (≤70 chars) and SEO description (≤155 chars)
   - Set realistic inventory (not 0, not absurd)
   - Build collection page if needed
   - Create the launch discount code (`<SKU>10` or similar) with expiry
   - Optional: deploy advertorial landing page on Vercel via `ops-planner`

`store-manager` must NOT use `create-product` directly to spawn the SKU — that would orphan the product from Dropdash's supply chain. If the Dropdash shell is missing at this stage, stop and have the operator add it before continuing.

## Stage 3 — Creative production (Day 1-3, parallel with Stage 2)
**Owner: creative-studio + india-localizer**

- Receive brief satisfying `creative-brief` skill
- Generate **18 variants** (3 angles × 6 formats) via Higgsfield + Canva
- Hinglish overlays + Indian-presenting talent (default)
- Brand-check + compliance-check
- Save to Drive `/Creatives/<sku>/<launch-date>/`
- Hand to `ads-manager`

## Stage 4 — Pixel / CAPI verification (Day 3)
**Owner: ads-manager**

- `ads_get_dataset_quality` returns "good" or better
- Test purchase on Shopify → verify Purchase event fires + dedup key matches
- Send `cod_confirmed` event configured for COD-true-revenue training

## Stage 5 — Test campaign launch (Day 4)
**Owner: ads-manager**

- CBO testing campaign at ₹2,000–₹3,000/day
- 3 ad sets: broad / interest stack 1 / interest stack 2
- Each ad set: 6 ads (mix angles)
- Advantage+ Placements
- UTMs locked in landing URL
- Operator approval before publish (always required for launch)

## Stage 6 — Learning phase (Day 4-7)
**Owner: ads-manager + marketing-analytics**

- No edits during learning phase (first ~50 events / 3-5 days)
- `marketing-analytics` reports daily
- `customer-support` and `order-fulfillment` watch for early feedback that informs hold/scale decisions
- After learning exit, apply `ad-scaling-rules` daily

## Stage 7 — Day-7 review (Day 7)
**Owner: marketing-analytics**

Decision tree:
- True ROAS ≥ BE × 1.5 → trigger `scale-winner`
- True ROAS BE × 1.0–1.5 → optimize for one more week (creative refresh, audience expansion)
- True ROAS < BE × 1.0 → trigger `kill-loser` post-mortem and decide if it's worth a creative pivot

## Stage 8 — Day-30 post-mortem (Day 30)
**Owner: ops-planner + product-research**

- Final P&L: revenue, ad spend, RTO loss, net margin
- What worked (hook, audience, creative type)
- What to repeat for next launch
- Notion "Launches" DB → status: Scaling / Maintained / Killed; post-mortem written

## Hard rules

- No launch without sample ordered and inspected.
- No launch with **pre-screen <7/13** from `winning-product-criteria` §0 (instant kill before any other work).
- No launch with depth score <24/35 from `winning-product-criteria` §1.
- No launch without `unit-economics` hard gate passing (NET PROFIT per total order > 0 at FAD 0.70 + CPP = 8% of SP).
- No launch without working pixel + CAPI.
- No launch without operator approval at Stage 5 publish.
- No scaling beyond ₹15k/day until Day-7 reconciled true ROAS confirms.
