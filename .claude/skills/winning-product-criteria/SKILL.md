---
name: winning-product-criteria
description: Decision framework for whether a product can profitably scale on Meta Ads to Indian buyers. 7-axis scoring (each 1-5), GO threshold, and concrete tests to apply per axis. Used by product-research before any launch is approved.
---

# Winning Product Criteria — Decision Framework

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

## GO / HOLD / KILL

- **GO** ≥24/35 with no hard kill → push to launch brief
- **HOLD** 18-23 → identify the weakest axis, attempt to lift (negotiate margin, find alt supplier, repackage angle); re-score
- **KILL** <18 or any hard kill → drop entirely, log in Notion "Killed" view with reason

## Notes for `product-research` agent

- Always show the score breakdown, not just the total.
- Always state the **two weakest axes** and the operator action that would raise them.
- If GO: produce the launch brief. If HOLD: produce the lift plan. If KILL: log and move on.
