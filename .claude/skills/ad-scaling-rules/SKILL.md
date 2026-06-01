---
name: ad-scaling-rules
description: Concrete scale, maintain, kill, and refresh rules for Meta Ads. Covers learning phase, daily decisions, scaling cadence, kill thresholds, and creative fatigue triggers. Used by ads-manager every daily run — never decide by feel.
---

# Ad Scaling Rules

All thresholds are tuned for Indian dropshipping with the COD-RTO reality baked in.
Replace `BE_ROAS` with the product's break-even ROAS from the launch brief.
Default `BE_ROAS = 1.6` (covers product cost + courier + RTO provision + GST + ops).

**Primary gate metric is CPP, not ROAS** — for India COD, CPP is the cleaner, faster signal (ROAS is corrupted by RTO until reconciled). Use ROAS as the reconciliation check after the fact.

---

## Operator SOP — India COD daily testing protocol

This is the operator's tested, current testing recipe. Use it as the default for every new product launch unless the product brief specifies otherwise.

### Campaign structure (per product)

- **One Sales campaign per product** — never bundle SKUs into one campaign
- **ABO at the ad-set level** (NOT CBO during testing). Set `₹200/day per ad set`.
- **Single-interest per ad set** — one targeting interest per ad set, broad placements
- **Advantage+ Audience suggestions OFF** during testing (you want to read interests cleanly)
- **Advantage+ Placements ON**
- **Optimization event**: Purchase
- **Naming convention** (enforced):
  - Campaign name: `<Product> – <Price>` (e.g., `Neck Fan – 999`)
  - Ad set name: `<Interest Name>` (e.g., `Summer Cooling`)
  - Ad name: `<Video number>` (e.g., `1`, `2`, `3`)

### Day-1 launch (the night before, scheduled for 4 AM IST)

- **5 ad sets**, each with a unique single interest, each at ₹200/day
- Total Day-1 spend cap: **₹1,000**
- Scheduled start: **4:00 AM IST** (lowest-CPM window for India)

### Day-2 expansion (scheduled 4 AM IST)

- Keep performing Day-1 ad sets running (per CPP gate below)
- Add **5 NEW ad sets** with different interests, same ₹200/day each
- Total Day-2 spend cap: **₹2,000** (the original 5 + new 5)

### Day-1 / Day-2 evening review — CPP gate

Compute Target CPP from `unit-economics` skill: **Target CPP = 8% of SP**.
Apply a **₹10 absolute buffer** on the Target CPP before killing (e.g., SP ₹999 → Target CPP ₹80 → kill threshold ₹90).

| Condition | Action |
|---|---|
| Ad set CPP ≤ Target CPP (with ₹10 buffer) | **Scale** (proceed to scaling phase) |
| Ad set has spent 1× Target CPP, still over the buffer, no purchase | **Kill** the ad set |
| Ad set CPP over buffer **but front-end is strong** (CTR ≥ 1% AND CPC < ₹7-₹10) | **Hold 1 more day** — give learning a chance |
| Poor front-end (CTR < 1% OR CPC > ₹10) | **Kill** the ad set |

### Front-end metric gates

| Stage | CPC target | CTR target | Notes |
|---|---|---|---|
| Testing | < ₹7.5 | ≥ 1.0% | Hard floors — below these, ad creative is the problem, not the audience |
| Scaling | < ₹5.0 | ≥ 1.0% | Scaling pulls CPC down naturally; if it doesn't, you scaled too fast |

CPP is the most important metric of all — front-end gates are secondary signals to decide *whether* to hold or kill when CPP is borderline.

### Day-3+ scaling

Move to the scaling rules below. Scale changes happen at **12:00 AM IST** (Meta processes overnight, learning stabilizes by morning).

### Reference CPP by price point

Derived from Target CPP = 8% of SP:

| Selling price | Target CPP | Kill threshold (with ₹10 buffer) |
|---|---|---|
| ₹699 | ₹56 | ₹66 |
| ₹999 | ₹80 | ₹90 |
| ₹1,199 | ₹96 | ₹106 |
| ₹1,499 | ₹120 | ₹130 |
| ₹1,999 | ₹160 | ₹170 |
| ₹2,499 | ₹200 | ₹210 |

---

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

Apply once an ad set passes the CPP gate (≤ Target CPP + ₹10 buffer) on at least 1 day with at least 1 purchase.

### Vertical scaling (preferred for incremental scale)

- **+20% budget per day**, max — never more (Meta's algorithm punishes bigger jumps with CPM spikes)
- Budget changes scheduled at **12:00 AM IST** so learning stabilizes by morning
- After 4 consecutive days of +20%, hold one day (let learning re-stabilize) then continue
- Only vertical-scale ad sets that are *at or under* Target CPP (with the ₹10 buffer)

### Horizontal scaling (preferred when one winner is found)

- Duplicate the winning ad set **3 times** (same interest, same creatives) inside the same campaign
- Set the duplicate budgets to **2× the original** (i.e., ₹400 each if the winner was at ₹200)
- This effectively gives the winner 7× exposure (1× original + 3× duplicates @ 2× budget = 6 + 1 = 7× spend) with controlled auction overlap
- Cull duplicates that drift over Target CPP within 48 hours — keep the survivors

### Higher-level scaling steps

- When total budget on a single product hits ₹15,000/day, switch from ABO to duplicating into a **scaling campaign** with CBO and budget ₹30,000/day
- For continued scaling beyond ₹50,000/day on a single product, move to **Advantage+ Shopping Campaign** with the catalog
- Never run more than 3 scaling ad sets per product simultaneously beyond the duplication batch — auction overlap kills CPM

## Phase 3 — Creative fatigue triggers

Check per ad, daily, after 7+ days live:

- Frequency > 2.5 (cumulative for active ad set) → request refresh
- CTR drop > 25% vs 7-day baseline → refresh
- CPM rise > 25% vs 7-day baseline (and not industry-wide via `ads_insights_industry_benchmark`) → refresh
- **Hook Rate** (3-sec video views ÷ impressions) **< 20%** → creative is the problem (not the audience) → refresh immediately. Strong Hook Rate is ≥ 30%; 20-30% is borderline; < 20% is dead on arrival.
- **Hold Rate** (25%-completion video views ÷ impressions) **< 10%** → the hook earned the impression but the demo body lost the viewer. Refresh the middle 3-10 seconds, keep the first frame. Strong Hold Rate is ≥ 15%; 10-15% is OK; < 10% means the script/pacing is broken.
- Repeat-purchase audience showing fatigue first → suppress for 14 days, then re-engage

**Hook Rate vs Hold Rate diagnostic:**

| Hook Rate | Hold Rate | Diagnosis | Fix |
|---|---|---|---|
| ≥ 30% | ≥ 15% | Strong creative top-to-bottom | Scale + clone hook into new variants |
| ≥ 30% | < 10% | Hook works, demo body is dead | Refresh middle 3-10s, keep first frame |
| < 20% | (any) | First frame failed; viewer never engaged | Full re-concept; thumbnail + first-frame redo |
| 20-30% | ≥ 15% | Borderline hook with strong body | Refresh thumbnail / first 1s only — body is fine |

Refresh = swap 50% of creatives in the ad set with new variants from `creative-studio`. Keep the top 1-2 performers.

## Phase 4 — Kill rules (apply before scale)

Pause an ad set immediately if any are true:

- ROAS < BE × 0.5 over 3 days
- CPM > 2.0 × industry benchmark (from `ads_insights_industry_benchmark`) for 3 days
- 0 purchases after spend ≥ 2 × target CPA
- **Ad-set CTR < 0.8% at 48-72h** (course-tested kill threshold — distinct from the per-ad CTR < 0.5% rule, which only retires individual creatives)
- **Hook Rate < 20% at 48-72h** — kill the ad set; creative isn't earning the impression
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

## Pre-launch campaign checklist

Before clicking Publish on any campaign, `ads-manager` confirms ALL of:

- [ ] Budget set correctly (₹200/ad set ABO for testing; otherwise per scaling rules)
- [ ] Link redirect verified — both the website URL and the description URL go to the live product page (not a 404, not a draft)
- [ ] Location exclusions applied — `cod_blocked_pincodes` from `docs/limits.md` are excluded
- [ ] Automated rules applied (kill if CPP > buffer, cut if CTR < threshold, etc.)
- [ ] Thumbnail set on every ad (no default placeholder thumbnails)
- [ ] Ad set start time = 4:00 AM IST (for testing) or 12:00 AM IST (for scaling)
- [ ] Naming convention enforced (Campaign: `<Product> – <Price>`, Ad set: interest, Ad: video number)
- [ ] Pixel + CAPI healthy (dataset quality "good" or better)

## Testing discipline — the Zuck Test

When testing creatives, audiences, or angles, follow scientific-method rigor:

- **Test ONE variable at a time.** Changing creative + audience + budget simultaneously means you never know what caused the result.
- **Minimum test budget**: ₹300-500 per ad set / 48-72 hours before drawing conclusions. Below that, signal isn't statistically meaningful.
- **Form a hypothesis before testing.** E.g., "Hook Rate dropped → hypothesis: thumbnail is weak → test: 3 new thumbnails on the same creative." Don't test randomly.
- **Winning products reveal themselves**: consistent purchases, stable CPP, healthy front-end signals. Losing products either show high CTR + no purchases (product-market fit problem — page or offer issue) OR low CTR (creative problem).
- The "Winning Product Test": if reducing budget on a "winner" kills results, the product is marginal — don't force scale.
- **If it works, it works from the start.** Strong products show signal in 48-72h. Do not "give it more time" on a flat ad set hoping it will turn around — that's hope, not data. Pareto applies: 80% of revenue comes from 20% of what you test. Cut losers fast so you can fund the next winner.
- **Pareto on the ad-set table**: of 10 ad sets launched, expect 2 to scale, 3 to maintain, 5 to die. That's healthy. If 8/10 are dying, your *product* or *creative* is the problem, not the audiences.

## Performance diagnostic decision tree (when results are off)

Before changing budgets or audiences, classify the failure mode:

| Symptom | Likely cause | Fix |
|---|---|---|
| Low CTR (<1%) + low CPC | Creative isn't earning impressions | Refresh hook/thumbnail (`creative-studio`) |
| High CTR (>2%) + low CVR (<1%) + no purchases | Landing page / product mismatch, NOT creative | Audit PDP — price match, COD badge, trust elements (`store-manager`); don't drop price reflexively |
| High CTR + good CVR + high RTO | Audience too broad / wrong intent | Tighten interests, add price anchor to ad copy, exclude impulse-buyer geos (`rto-prevention`) |
| Stable CPP + sudden CPM spike | Auction shift or fatigue | Check `ads_insights_industry_benchmark` first — if vertical-wide, hold. If account-specific, creative refresh. |
| Good Hook Rate (≥30%) + low CTR | Hook works visually, copy/CTA is weak | Same creative, swap headline + CTA only |
| Meta ROAS ≥2× + Shopify true ROAS <1× | RTO eating margin OR pixel over-attributing | Reconcile per Phase 7 + check `pixel-doctor` |

This tree saves the operator from the most common mistake: dropping price when CTR is high but conversion is low. That's a landing page problem, not a price problem.

## Pre-warmup gate (new accounts)

If the ad account is < 7 days old or just reinstated, **do not run the standard testing protocol**. Run `ad-account-warmup` playbook first. Demand for ₹1 lakh/day spend on a Day-1 account = throttle / ban. Account trust is earned, not bought.

## Auto-execute boundary (for ads-manager)

`ads-manager` may execute without asking only inside this band:
- Pause ad sets matching learning-phase or kill-rule conditions exactly (CPP > Target+₹10 after 1× CPP spent, or front-end fail)
- +20% budget on ad sets in SCALE row, max once per day, scheduled for 12:00 AM IST
- Duplicate a winner up to 3× per the horizontal-scaling rule (each duplicate at 2× original budget)
- Pause individual ads with CTR < 0.5% after 2,000 impressions

Anything else (>20% changes, new campaigns, mass pauses, retargeting build-out, switching from ABO to CBO scaling campaign) → propose to operator first.
