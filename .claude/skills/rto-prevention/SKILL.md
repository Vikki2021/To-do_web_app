---
name: rto-prevention
description: Concrete tactics to reduce Return-to-Origin (RTO) rate for Indian COD dropshipping. Covers verification tiers, pincode blocking, creative targeting to reduce low-intent buyers, NDR recovery, and prepaid conversion. Used by customer-support, order-fulfillment, ads-manager, and india-localizer. RTO baseline is 25-35%; target is <20%; excellent is <15%.
---

# RTO Prevention Playbook

RTO is the single biggest margin killer in Indian COD dropshipping. Every returned parcel costs:
- Product cost (if damaged)
- Forward shipping (~₹60–90)
- Reverse shipping (~₹60–90)
- RTO handling fee (~₹20–40)
- Lost ad spend that generated that order
- **Total RTO cost: ~₹150–250 per order** (use ₹72 as the minimum in BEC model, real-world closer to ₹200)

**Default assumption:** 30% RTO on untreated COD. Below 20% = good. Below 15% = excellent.

---

## Layer 1 — Audience Quality (reduce low-intent buyers upstream)

Before the order even happens, reduce the % of non-serious buyers in your ad audience.

### Creative targeting signals
- **Avoid** broad interest like "Online Shopping" — attracts browsers, not buyers
- **Prefer** problem-specific interests: "neck pain", "hair care", "kitchen gadgets" — buyer intent is already there
- **Use price in ad copy** — "₹999 COD free delivery" filters out buyers who can't afford it or will impulse-reject on the doorstep
- **Show the product being used**, not just the product — reduces "not what I expected" RTO reason

### Geo exclusions (mandatory)
Apply to every ad set per `indian-dropshipping` §9:
- Seven Sisters (Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Tripura)
- Jammu & Kashmir + Ladakh
- Maintain `docs/limits.md → cod_blocked_pincodes` — add a pincode after 2 RTOs from it
- High-RTO cities to watch: tier-3/4 towns with no local distribution center — check Shiprocket's non-serviceable list

### Price-point RTO risk (memorize)
| Price | COD RTO risk |
|---|---|
| ≤ ₹699 | Low — low regret, easy impulse commit |
| ₹700–₹1,499 | Medium — sweet spot, manageable |
| ₹1,500–₹2,499 | High — requires strong verification |
| ₹2,500+ | Very high — push prepaid hard; COD only with voice confirm |

---

## Layer 2 — Order Verification (catch rejections before dispatch)

### Verification tier system (non-negotiable)

| Order value | Method | Timeline | Cancel if |
|---|---|---|---|
| COD ≤ ₹999 | Email confirmation only | Auto-send on order | No action 24h |
| COD ₹999–₹1,999 | Email + WhatsApp/SMS | Send within 1h of order | No reply 24h |
| COD > ₹1,999 | Phone call + explicit YES | Call within 2h | No YES in 24h |
| Repeat buyer (≥2 prepaid) | Skip verification | Ship immediately | — |

### Verification message (WhatsApp — copy from `whatsapp-templates` skill)
The confirmation message must:
1. Use customer's name
2. Show the exact product + price
3. Give an easy YES reply button or link
4. Mention "agar aap order nahi karna chahte, reply karo NO — koi pareshani nahi"
5. Be in Hinglish if tier-2/3 phone number prefix

### Batch processing
- Run verification check at 10:00 AM IST and 6:00 PM IST daily
- Auto-cancel unconfirmed orders at the 24h mark (send cancellation email with re-order link)
- Log cancellations: `cancelled_reason = "cod_unconfirmed"` — track this rate weekly

---

## Layer 3 — Pincode Intelligence

### Blocked pincode management
Maintain `docs/limits.md → cod_blocked_pincodes`:
- Add pincode after 2 RTOs from it
- Review monthly — some pincodes improve (new courier routes)
- Source data: Shiprocket's non-serviceable zones + your own RTO log

### Phone prefix blacklist
Track `cod_blocked_phones` — repeat RTO offenders:
- Same number ordering from multiple addresses = refusal pattern
- Block at the Shopify discount / order-tag level

### High-risk address signals (flag for manual review)
- Address with no specific building/flat number
- "Near X landmark" only without street address
- Same phone number, different name, different address (previous pattern)
- Extremely remote pincodes not covered by your primary courier

---

## Layer 4 — Prepaid Conversion (best RTO fix = no COD)

### Conversion incentives (in order of effectiveness)
1. **10% off on prepaid** — most effective. Frame as "extra saving" not "COD penalty"
2. **"Free shipping unlocked on prepaid"** — effective when COD has a visible ₹40–50 fee
3. **WhatsApp UPI link in confirmation email** — "click to pay ₹X via UPI, we'll ship today" — recovers ~15% of COD to prepaid
4. **Priority dispatch** — "prepaid orders ship same day, COD ships in 2 days" — time-sensitive buyers convert

### Post-order prepaid nudge (in verification email)
Include in the COD confirmation email (Touch 1):
> "PS: Pay online now via UPI and get an extra ₹<X> off! Link: [UPI deeplink] — Your order ships 24h faster."

### Never use COD penalties above ₹60
A ₹100+ COD fee is visible at checkout and kills conversion more than it reduces RTO. Keep it ≤₹50 and frame it as a "handling convenience charge", not a penalty.

---

## Layer 5 — NDR Recovery (salvage the delivery)

### NDR = Non-Delivery Report (courier tried, failed)

| NDR attempt | Action | Owner |
|---|---|---|
| NDR 1 | Auto-email + WhatsApp: "Delivery tried, when are you available?" | order-fulfillment |
| NDR 2 | Phone call from operator: "Are you available tomorrow AM/PM?" | operator / customer-support |
| NDR 3 | Request re-delivery to alternate address or nearest pickup point | order-fulfillment |
| NDR 4 | Accept RTO — send RTO recovery email (re-ship offer) | order-fulfillment |

**NDR rate >10% = courier problem** (wrong delivery windows, wrong area coverage) → try switching courier for that pincode zone.

### NDR recovery email
- Subject: "Aapka order delivery miss ho gayi — abhi rebook karein"
- Offer: "Want to pick up from our courier's branch? Or re-schedule delivery for free?"
- Include direct tracking + courier contact number
- If buyer is unresponsive after 3 attempts: accept RTO, offer re-order with 20% discount

---

## Layer 6 — RTO Root Cause Analysis (weekly)

Run every Friday. Classify RTOs by reason code:

| Reason Code | Signal | Fix |
|---|---|---|
| `buyer_not_available` | NDR pattern | Improve delivery time communication |
| `buyer_refused` | Delivered, customer rejected | Verification gap or product expectation mismatch |
| `wrong_address` | Address error | Better address capture on checkout + verification |
| `product_not_needed` | Buyer impulse reversal | Better verification + prepaid push |
| `duplicate_order` | Multiple orders from same buyer | Dedup logic in Shopify |
| `pincode_unserviceable` | Courier RTO | Block that pincode in Meta geo targeting |
| `quality_complaint` | Product defect RTO | Product research flag — SKU may need KILL |

**If `buyer_refused` > 50% of RTOs:** Creative or product expectation is broken — hand to `product-research` and `creative-studio`.
**If `pincode_unserviceable` > 30%:** Geo targeting is dirty — hand to `ads-manager` for exclusion update.
**If `buyer_not_available` > 40%:** NDR recovery process is broken — tighten Layer 5.

---

## RTO Dashboard Targets

| Metric | Excellent | Good | Warning | Crisis |
|---|---|---|---|---|
| Overall RTO rate | <15% | 15–25% | 25–35% | >35% |
| Verification confirm rate | >85% | 70–85% | 55–70% | <55% |
| NDR recovery rate | >40% | 25–40% | 10–25% | <10% |
| Prepaid % of orders | >30% | 20–30% | 10–20% | <10% |
| Avg RTO cost/order | <₹150 | ₹150–200 | ₹200–250 | >₹250 |

---

## Handoff

- RTO rate >35% for 3 days → `performance-coach` (root cause across all layers)
- RTO spike on specific SKU → `product-research` (is product expectation mismatch?)
- RTO spike on specific geo → `ads-manager` (geo exclusion update)
- Verification rate dropping → `customer-support` (tighten scripts)
- Prepaid conversion low → `store-manager` (add prepaid incentive to PDP) + `email-marketer` (UPI nudge in confirmation email)
- Courier NDR rate rising → `order-fulfillment` (courier switch evaluation)
