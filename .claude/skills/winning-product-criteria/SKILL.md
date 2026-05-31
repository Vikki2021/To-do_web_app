---
name: winning-product-criteria
description: Decision framework for whether a product can profitably scale on Meta Ads to Indian buyers. 7-axis scoring (each 1-5), GO threshold, and concrete tests to apply per axis. Used by product-research before any launch is approved.
---

# Winning Product Criteria — Decision Framework

Two-layer decision:

1. **Pre-screen** — 13-KPI YES/NO checklist (§0). Need ≥7/13 to be eligible for depth-scoring.
2. **Depth score** — 7-axis 1-5 scoring (§1). Need ≥24/35 to be GO.

A product that fails the pre-screen is KILLED on the spot — don't waste research cycles depth-scoring it.

---

## 0. Pre-screen — 13-KPI checklist (run first)

Every candidate must hit **≥7 of 13** before it earns the depth scoring below. Score honestly — no half-points.

| # | KPI | YES test |
|---|---|---|
| 1 | Small in size | Fits in a shoebox; dimensional weight under the 500g courier slab |
| 2 | Easy to ship | Not fragile · not battery-restricted · not >100ml liquid · not on Meta restricted list |
| 3 | High margin | Sell price ≥ 3.5× landed cost (will be re-verified by `unit-economics` hard gate) |
| 4 | Proof of concept from past winners | At least one competitor ad has been running 30+ days in Meta Ad Library, OR a near-identical SKU has scaled on Shopify/TikTok in last 12 months |
| 5 | Improves confidence | Buyer feels better about themselves after using — body, skin, hair, posture, style |
| 6 | Improves convenience | Removes a daily friction (one-handed, hands-free, faster setup, portable) |
| 7 | Saves people time | Cuts a 10-min task to 2 min, or eliminates a repeat chore |
| 8 | Solves a real problem / fills a gap | Pain stateable in one sentence: "X is annoying because Y" |
| 9 | Saves people money | Replaces a recurring spend (salon, repair, electricity, refills, subscriptions) |
| 10 | Extremely unique | Mechanism or form factor not in Amazon.in / Flipkart top 10 results |
| 11 | Improves quality of life | Sleep, comfort, peace-of-mind, ambient delight — the "luxury for cheap" feeling |
| 12 | High perceived value | Looks like ₹2,000+; priceable comfortably in the ₹699-₹1,499 sweet spot |
| 13 | Woman-dominated audience | Female buyer dominant (kitchen, beauty, kids, home decor, jewelry, fashion). India D2C buying power skews heavily female — this is the single highest-converting demographic on Meta India |

### Pre-screen thresholds

| Hits | Verdict |
|---|---|
| **10-13** | Rare — jump the queue, fast-track to depth-scoring + brief |
| **7-9** | Standard candidate — proceed to depth-scoring |
| **4-6** | Marginal — attempt one angle/positioning pivot, then re-screen once |
| **≤3** | KILL — don't burn research cycles |

### Pre-screen rules

- **KPI #4 (proof of concept)** is the highest-weight signal — a YES here is worth the operator's confidence on three fence-sit KPIs. Always link the competitor Meta Ad Library URL into the Product Arsenal `fb_ad_url` field when this KPI is YES.
- **KPI #13 (woman-dominated audience)** is India-specific weight — 70%+ of impulse D2C revenue in our category mix comes from female buyers. Missing #13 requires extra-strong margin (≥4×) to compensate.
- **KPIs #1, #2, #3 are structural** — a NO on any of these makes the product nearly un-launchable regardless of the other 10. Treat a NO on a structural KPI as a soft kill unless margin is exceptional.
- Pre-screen is a fast, ~2-minute pass. If you're agonizing over a YES/NO, mark it NO and move on.

---

## 1. Depth scoring — 7-axis (run only after pre-screen ≥7/13)

Score each candidate 1-5 on every axis. **Total ≥24/35 → GO**. Below that, HOLD or KILL.

| Axis | 5 (excellent) | 1 (bad) |
|---|---|---|
| Margin | ≥3.5x landed cost incl. ads | <2x; thin sliver after returns |
| Wow factor | Demoable in 5 sec, "I need this" reaction | Boring, commodity-feeling |
| Broad appeal | 30M+ Indian buyers in target | Narrow niche <2M |
| Video-friendly | Visual demo carries the sell | Needs explanation, no demo |
| Light + small | <500g, <30cm, courier-safe | Heavy/fragile/large/restricted |
| Not big-box | Not on Amazon top 3 / Flipkart top 3 | Saturated and undercut |
| India COD-fit | Sweet spot ₹699–₹1,499 + low RTO category | >₹2,500 for cold COD audience |

## Per-axis tests

### Margin (target ≥3.5x)
- Landed cost = product + supplier shipping + packaging + courier-to-customer + RTO loss provision
- RTO provision = `(landed cost) × (expected RTO %)` (default 25%)
- Required margin to scale = 3.5x landed cost = sell price ≥ 3.5 × landed
- If supplier pricing is negotiable, push for 15-20% off list before scoring

### Wow factor
- 3-second test: show an unedited product photo to a non-buyer. If reaction isn't "what is that / I want one", score ≤2.
- Higher scores for: solves visible pain, novel mechanism, satisfying-to-watch in motion, transformation (before/after)

### Broad appeal
- Estimate via Meta Audience size for relevant interests (use `ads_insights_advertiser_context`)
- 30M+ → 5; 10-30M → 4; 5-10M → 3; 2-5M → 2; <2M → 1
- Niche products can win but need premium pricing to offset smaller pool

### Video-friendly
- Can you demo it in a 5-second clip? Yes → 4-5
- Does the demo "satisfy" (oddly satisfying / before-after / transformation)? → 5
- If you need text overlays to explain → 2-3
- If only static product shots work → 1-2

### Light + small
- ≤500g + dimensional weight under courier slab → 5
- 500g–1kg → 3
- 1-2kg → 2
- >2kg or fragile (glass, ceramics) or restricted (battery, liquid >100ml) → 1
- Heavier = higher courier cost = thinner margin + higher damage rate

### Not big-box
- Search exact product on Amazon.in and Flipkart
- Not in top 10 results → 5
- In top 10 but priced >2x our sell price → 4
- In top 10 with similar price → 2
- Top 3 Prime + cheaper → 1 (kill)
- Indian buyers will Google before COD; if they find your product cheaper on Amazon, they cancel

### India COD-fit
- ₹699-1,499 + low-RTO category (kitchen, gadgets, accessories) → 5
- ₹1,500-2,499 + medium RTO → 3-4
- ₹2,500-4,999 → 2 (only with prepaid push)
- >₹5,000 cold COD → 1

## Hard kills (instant disqualify regardless of score)

- Health/medical claims (diabetes, hair regrowth, fat burning, libido, etc.)
- Branded/trademarked products (Apple-style chargers, fake brands)
- Restricted categories on Meta (weapons, supplements, surveillance)
- Items that fail Indian customs or BIS certification (some electronics)
- Products requiring regulatory licenses you don't hold (cosmetics → CDSCO, food → FSSAI)
- Items with known IP infringement (popular character merchandise without license)
- **Apparel + footwear** — structurally high-RTO niches per EEA Coach Deep. Indian COD buyers see-and-decide-at-door on fit/color, RTO routinely hits 40-55%. Only launch with prepaid-only checkout or skip entirely.
- **"Trendy not need-based"** SKUs that fail the 50% RTO survivability test — if NET margin at FAD 0.50 + CPP 8% + RTO 50% is ≤ ₹0, the SKU cannot absorb a normal-bad week and will bleed cash.

## GO / HOLD / KILL

A candidate must clear **both** layers:

- **GO** Pre-screen ≥7/13 **and** depth score ≥24/35 **and** no hard kill **and** `unit-economics` hard gate passes (NET PROFIT per total order > 0 at FAD 0.70 + CPP = 8% of SP) → push to launch brief
- **HOLD** Pre-screen ≥7/13 but depth 18-23, OR pre-screen 4-6 → identify the weakest signals, attempt one lift (negotiate margin, alt supplier, repackage angle, sharper hook); re-screen + re-score
- **KILL** Pre-screen ≤3, OR depth <18, OR any hard kill, OR `unit-economics` gate fails → drop entirely, log in Notion "Killed" view with reason (which layer failed)

## Notes for `product-research` agent

- Always run pre-screen FIRST. Report the 13-KPI hit-count and which KPIs were YES vs NO before doing anything else.
- If pre-screen fails (<7/13), STOP — don't depth-score, don't write a brief. Log KILL + reason and return.
- If pre-screen passes, then do depth-scoring and the `unit-economics` gate.
- Always show the score breakdown, not just the total.
- Always state the **two weakest signals** (one from pre-screen NOs, one from lowest depth axis) and the operator action that would raise them.
- If GO: produce the launch brief. If HOLD: produce the lift plan. If KILL: log and move on.

## Mental models (codified from EEA Coach Ishan / Coach Ramesh)

These are non-negotiable framing rules. Apply them to every product decision:

### Products ≠ Marriage
You are not committed to a SKU. The moment data says no, move on. Operators who fall in love with a product they "feel" should work burn cash trying to force it. **Cut losers fast, double-down on winners.** A KILL today is cheaper than a HOLD that bleeds for two weeks.

### Data Over Emotion
Never let "but I really like this product" override the 13-KPI / 7-axis / unit-economics gates. If three independent quantitative gates say NO, the answer is NO — your liking it is irrelevant data to the Indian buyer.

### If It Works, It Works From the Start
Strong products show strong signal in the first 48-72 hours. **Do not "give it more time" hoping a flat-ROAS product will turn around.** Pareto applies: 80% of revenue comes from 20% of products you test. Your job is to identify the 20% fast and kill the rest faster.

### Process of Elimination
Test enough products that the winners reveal themselves. A 1-in-10 winning rate is industry standard — you should be testing 10+ candidates a month to surface 1-2 scalable winners. Anything less and you're not running enough volume to find the real opportunities.
