# Scale Winner Playbook

For products that hit `ad-scaling-rules` SCALE FAST or SCALE thresholds.
Goal: 4-5× current scale without breaking unit economics.

## Trigger

- `ads-manager` daily report flags an ad set at ROAS ≥ BE × 1.5 sustained 3 days
- Or operator says "scale <product>"

## Step 1 — Verify (marketing-analytics)

- Reconcile Meta-reported revenue vs Shopify (must be within 30%)
- Compute true ROAS (Shopify net × (1 − RTO%) ÷ spend)
- Confirm RTO % for this SKU in last 14 days (not over 30%)
- If any check fails, fix the underlying issue first — do NOT scale on broken data

## Step 2 — Lock in margin (store-manager + product-research)

- Confirm landed cost is current (negotiate supplier if volume justifies it)
- Confirm courier rate at projected volume (cheaper rate at scale = margin)
- If margin can be locked tighter, update break-even ROAS and update launch brief

## Step 3 — Creative depth (creative-studio)

- Pull top 3 ad performers; extract pattern (hook / visual / talent / music)
- Generate **15 new variants** in the winning pattern + 5 net-new angles for diversification
- Avoid creative monoculture — different hooks, same product, same audience

## Step 4 — Audience expansion (ads-manager)

Use the ladder from `ad-scaling-rules`:
1. Broaden interests
2. Add Advantage+ Audience suggestions
3. Add 1% LAL of last-90d-purchasers (if ≥1,000 purchasers)
4. Expand 1-3% LAL
5. Eventually, fully broad

## Step 5 — Budget cadence (ads-manager)

- Existing winning ad set: +20%/day, max 4 days then 1-day hold
- Duplicate into a separate "scaling campaign" CBO at 2× the test budget
- Once total spend on this product passes ₹50k/day, evaluate Advantage+ Shopping Campaign with catalog
- Never run more than 3 scaling ad sets simultaneously per product (auction overlap)

## Step 6 — Cash-flow guardrail (operator + ops-planner)

- Compute next 14-day cash position: COD remittance lag (T+5 to T+7) vs daily ad spend
- If projected to dip below 30-day operating buffer, slow scaling — don't fund growth from suppliers' deferred payments
- Tag this in Notion "Launches" DB

## Step 7 — Operational scale (operator + customer-support + order-fulfillment)

- Customer support: confirm response SLA can be maintained at 2× volume
- Fulfillment: confirm courier pickup schedule + COD verification capacity
- Supplier: confirm 2-week stock commitment in writing
- Inventory in `store-manager` topped up

## Step 8 — Monitoring (marketing-analytics, daily)

Track for 14 days post-scale:
- True ROAS holding above BE × 1.4
- CPM not climbing >25% above scale-start baseline
- RTO % not climbing >5pp
- Repeat-purchase rate (early indicator of audience saturation)

If any signal degrades 2 days in a row → stop scaling, hold for a week, reassess.

## Hard rules

- Never scale faster than +20% budget per ad set per day.
- Never scale on Meta-reported ROAS alone — Shopify reconciliation is mandatory.
- Never scale a product with RTO % >35% — fix the funnel first (better COD verification, prepaid push, audience tightening).
- Never deplete cash buffer below 30 days to fund scale.
