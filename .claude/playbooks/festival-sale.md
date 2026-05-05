# Festival Sale Playbook

For Indian festival windows. Reference the calendar in `indian-dropshipping` skill.
Lead times below assume Diwali-scale (T-21). For smaller festivals (e.g., Bhai Dooj T-7), compress proportionally.

## Trigger

- Calendar event "<Festival> Sale Prep — T-<n>" auto-created by `ops-planner`
- Or operator says "prep for Diwali" / "Raksha Bandhan plan"

## T-21 — Strategy
**Owner: ops-planner + product-research**

- Pick 5-10 SKUs that fit the festival theme (gifting / decor / regional)
- Set sale targets: revenue, units, ROAS goal
- Confirm supplier inventory commitment (this is THE bottleneck — running out at peak hurts more than not selling)
- Notion "Festival Calendar" entry created with linked SKUs

## T-14 — Creatives + Bundles
**Owner: creative-studio + store-manager + india-localizer**

- Festival-themed creatives (rangoli/diya/sweets palette for Diwali; rakhi visuals for RB; etc.)
- Hinglish copy with festival-specific hooks ("Iss Diwali, ghar ko special banao")
- Build bundles in `store-manager` (e.g., gift sets at ₹999 / ₹1,499 / ₹2,499 tiers)
- Sale collection page with festival banner

## T-10 — Email warm-up + retargeting build
**Owner: customer-support + ads-manager**

- Send "save the date" email to customer list (10-15% off teaser)
- Build retargeting audiences: site visitors last 60d, past purchasers last 180d
- Lookalikes seeded against past festival buyers if data exists

## T-7 — Soft launch
**Owner: ads-manager + creative-studio**

- Run festival creatives at 50% of planned peak budget
- Validate hooks before full spend
- Adjust based on early CTR / CPM signals

## T-3 — Spend ramp
**Owner: ads-manager**

- Ramp to 100% planned budget
- Add urgency hooks ("Last 3 days") in creative refresh
- Increase retargeting frequency cap to 3/week
- COD verification team (ops or `customer-support`) on standby for volume

## T-0 (festival day +/- 1) — Peak
**Owner: every agent**

- Hourly checks: inventory, ROAS, CPM, customer queries
- Auto-pause any ad set whose CPM doubles vs T-3 baseline (auction overheating)
- `customer-support` priority: order status replies <30 min
- `order-fulfillment` runs twice daily

## T+1 to T+3 — Tapering
**Owner: ads-manager + customer-support**

- Drop budget 30%/day back to baseline
- "Festival extended — 24 hours only" creative for one day if budget left
- Heavy customer-support load (all the COD shipments incoming)

## T+7 — Post-mortem
**Owner: marketing-analytics + ops-planner**

- Total revenue, gross margin, ad spend, RTO % (festivals see RTO spike)
- Which SKU won, which bundle won, which hook won
- Inventory left over → clearance plan
- Notion "Launches" / "Festival Calendar" updated

## Hard rules

- Confirm supplier stock at T-21 in writing. Out-of-stock at peak = brand damage.
- Festival RTO is typically +5pp above baseline — bake into target ROAS.
- Don't launch new SKUs for the first time during a festival window. Festival = scale proven winners.
- Indian holidays close many couriers for 1-2 days around the festival — block that ETA in tracking emails.
