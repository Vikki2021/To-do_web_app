# NF-022 Sample Order Brief — Wearable Bladeless Neck Fan

**Purpose:** Order 1 sample unit to inspect quality, photograph for creative, and validate margins before any ad spend.

**Date prepared:** 2026-05-11
**Pipeline status:** Researching → moves to **Sourced** after sample arrives + inspection passes

## Supplier

- **Source:** IndiaMART
- **Supplier ID:** `22287620797`
- **Location:** Delhi
- **Quote (single unit):** ₹140 + courier
- **Quote (50-unit MOQ):** ₹120/unit (negotiable, target ₹105–₹115)

Search this supplier on IndiaMART: https://m.indiamart.com (login → search "wearable bladeless neck fan" → filter location Delhi → find supplier ID `22287620797` or similar listing).

## What to order

**Quantity:** 1 unit (sample only)
**SKU we'll use internally:** NF-022

**Confirm with supplier before paying:**

- [ ] Bladeless design (safety vs traditional fan — required for our hook angle)
- [ ] **USB-C rechargeable** (NOT micro-USB — that's a 2018 cable, looks cheap)
- [ ] 3-speed minimum (low/medium/high)
- [ ] Battery capacity ≥ 2,400 mAh (anything below this gives <3h runtime — bad reviews ahead)
- [ ] Weight ≤ 250g (neck-comfort threshold)
- [ ] Adjustable / universal neck-fit (one-size-fits-all framing in copy depends on this)
- [ ] Available colors — note what's stocked (white + black at minimum)
- [ ] Indian power-adapter compatibility (charging brick, if included)
- [ ] HSN code on the invoice (we filed `8414` in the draft — supplier should confirm)
- [ ] Warranty / replacement window from supplier (≥30 days for sample protection)

## Shipping

- **Ship to:** your warehouse/home address
- **Mode:** Standard ground (3–5 days)
- **Total expected:** ~₹140 unit + ₹50-80 courier = ~₹220 all-in
- **Payment:** UPI / phone-confirmed COD (whichever supplier offers; prepaid preferred for invoice trail)

## On arrival

Spend 30 minutes on this — it's the highest-leverage step for the launch.

1. **Unboxing video on phone** (vertical 9:16) — capture the moment you open the box, pull out the fan, plug in to charge. Raw and real. This is creative asset #1.
2. **Photograph:**
   - Hero shot on white background (kitchen counter + natural light works)
   - Worn on neck (selfie + family member's neck for variety)
   - With size reference (next to your hand or a phone)
   - Charging port + cable detail (proves USB-C claim)
   - Box + accessories layout flat-lay
3. **Test:**
   - Battery: charge to full, run on high until dead, note hours
   - Noise: measure dB with a phone app at speaker-distance ≤30cm (target <50dB on low)
   - Heat: confirm doesn't get warm during 1h run
   - Neck fit: try with 2-3 different neck sizes if available
4. **Verdict log** (paste into Notion Product Pipeline → NF-022 entry → Notes URL):
   - PASS / FAIL with reasons
   - Updated landed cost projection if MOQ price changed during conversation
   - Any spec corrections vs `dashboard/data/draft-products.ts → NF_022_DRAFT`

## What happens after PASS

1. Operator adds NF-022 to Dropdash (with confirmed MOQ pricing + supplier ID)
2. Dropdash pushes a product shell to Shopify (auto, ~24h)
3. `store-manager` enriches the shell using `NF_022_DRAFT` (description, metafields, tags, compare-at, SEO)
4. `creative-studio` generates 18-variant ad batch using your unboxing + photo assets as reference
5. `ads-manager` launches the testing campaign (CBO ₹2,000–₹3,000/day, 3 ad sets, BE ROAS 1.6×)

## What happens after FAIL

- Log the failure reason in Notion (build a "what NOT to source" pattern library)
- Try the same product from a different supplier OR pivot to BB-021 (Ice Roller) or GP-031 (Galaxy Projector) which are the rank-2 and rank-3 GO candidates from the same research run.
- Sunk cost: ~₹220. Acceptable.

## Do NOT do before sample passes

- ❌ Any ad spend on NF-022
- ❌ Push to Dropdash
- ❌ Update product pipeline status beyond "Researching"
- ❌ Generate creative beyond placeholder briefs

The sample-gate is non-negotiable per `indian-dropshipping` skill.
