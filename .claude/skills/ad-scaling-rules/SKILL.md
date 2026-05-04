---
name: ad-scaling-rules
description: Concrete scale, maintain, kill, and refresh rules for Meta Ads. Covers learning phase, daily decisions, scaling cadence, kill thresholds, and creative fatigue triggers. Used by ads-manager every daily run — never decide by feel.
---

# Ad Scaling Rules

All thresholds are tuned for Indian dropshipping with the COD-RTO reality baked in.
Replace `BE_ROAS` with the product's break-even ROAS from the launch brief.
Default `BE_ROAS = 1.6` (covers product cost + courier + RTO provision + GST + ops).

## Phase 0 — Learning phase (first 50 events / 3-5 days)

- **Do not edit** budget, audience, placement, or bid during the learning phase. Edits restart learning and waste spend.
- **Exception** (kill anyway): ad set has spent ≥ 2× target CPA with **0 purchases**. Pause.
- **Exception** (kill anyway): ad has CTR < 0.5% after 2,000 impressions. Pause that ad, keep ad set.

## Phase 1 — Daily decision matrix (post-learning)

Look at **3-day rolling ROAS** for every active ad set. Decide per row:

| Condition | Decision | Action |
|---|---|---|
| ROAS ≥ BE × 2.0 (huge winner) | **SCALE FAST** | Duplicate to scaling campaign at 2× budget |
| BE × 1.5 ≤ ROAS < BE × 2.0 | **SCALE** | +20% budget today (auto-approved within `ad-scaling-rules`) |
| BE × 1.2 ≤ ROAS < BE × 1.5 | **MAINTAIN** | No change |
| BE × 0.9 ≤ ROAS < BE × 1.2 | **OPTIMIZE** | Refresh creative if frequency >2.0; else hold one more day |
| BE × 0.5 ≤ ROAS < BE × 0.9 | **WARNING** | Day 2 of warning → cut budget 30%; day 3 → pause |
| ROAS < BE × 0.5 | **KILL** | Pause immediately |

Use 7-day ROAS to break ties when 3-day is volatile.

## Phase 2 — Scaling cadence (winning ad sets)

- Max **+20% budget per day**, never more (Meta's algorithm punishes bigger jumps with CPM spikes).
- After 4 consecutive days of +20%, hold one day (let learning re-stabilize) then continue.
- When budget hits ₹15,000/day, switch from ad-set-level scaling to duplicating into a **scaling campaign** with CBO and budget ₹30,000/day.
- For continued scaling beyond ₹50,000/day on a single product, move to **Advantage+ Shopping Campaign** with the catalog.
- Never scale more than 3 ad sets per product simultaneously — auction overlap kills CPM.

## Phase 3 — Creative fatigue triggers

Check per ad, daily, after 7+ days live:

- Frequency > 2.5 (cumulative for active ad set) → request refresh
- CTR drop > 25% vs 7-day baseline → refresh
- CPM rise > 25% vs 7-day baseline (and not industry-wide via `ads_insights_industry_benchmark`) → refresh
- Repeat-purchase audience showing fatigue first → suppress for 14 days, then re-engage

Refresh = swap 50% of creatives in the ad set with new variants from `creative-studio`. Keep the top 1-2 performers.

## Phase 4 — Kill rules (apply before scale)

Pause an ad set immediately if any are true:

- ROAS < BE × 0.5 over 3 days
- CPM > 2.0 × industry benchmark (from `ads_insights_industry_benchmark`) for 3 days
- 0 purchases after spend ≥ 2 × target CPA
- True ROAS (Shopify-reconciled, COD-discounted by RTO%) < 0.9 over 7 days even when in-platform ROAS looks fine
- Pixel/CAPI quality drops below "good" for 48h (signal corrupted, decisions unsafe)

## Phase 5 — Audience expansion ladder

When a winning interest stack saturates (CPM rising 20%+ over 14 days):

1. Broaden interests (drop the 1-2 narrowest)
2. Add Advantage+ Audience suggestion (don't restrict)
3. Add 1% LAL of last-90d-purchasers (need ≥1,000 purchasers)
4. Expand to 1-3% LAL once 1% saturates
5. Eventually go fully broad (no targeting, just creative + Advantage+ Audience)

## Phase 6 — Retargeting rules

Build retargeting only after 1,000+ pixel/CAPI events:

- ATC30 (added to cart, last 30 days, no purchase) — small budget, high frequency cap (1.5/week)
- VV75-30d (75% video viewers, last 30d, no purchase) — main retargeting volume
- Engaged-90d (engaged with page/profile last 90d) — colder retargeting
- Suppress purchasers always; suppress current customers until 30 days post-delivery for repeat
- Target retargeting ROAS = BE × 3.0+ (it should be the highest-ROAS line in the account)

## Phase 7 — Reconciliation rule (most important)

**Meta-reported ROAS ≠ true ROAS** for COD-heavy stores.

True ROAS = `Shopify net revenue × (1 - RTO%) ÷ ad spend`

- If Meta ROAS = 2.5× and RTO = 28%, true ROAS = roughly 1.8×
- Always reconcile against Shopify before any scale/kill decision
- If gap >40% between Meta and Shopify revenue, your pixel/CAPI is broken — fix that before changing budgets

## Auto-execute boundary (for ads-manager)

`ads-manager` may execute without asking only inside this band:
- Pause ad sets matching learning-phase or kill-rule conditions exactly
- +20% budget on ad sets in SCALE row, max once per day
- Pause individual ads with CTR < 0.5% after 2,000 impressions

Anything else (>20% changes, new campaigns, mass pauses, retargeting build-out) → propose to operator first.
