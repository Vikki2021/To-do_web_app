---
name: indian-dropshipping
description: Comprehensive playbook for running a profitable dropshipping store targeting Indian buyers. Covers pricing tiers, COD/RTO management, GST, regional language strategy, festival calendar, courier choice, supplier sourcing (IndiaMART/Meesho/AliExpress), pixel/CAPI for India, and India-specific Meta Ads tactics. Used by every agent — invoke whenever a decision is India-specific.
---

# Indian Dropshipping Playbook

This is the source of truth for every India-specific decision in the harness.
Every other agent and skill defers here when the buyer is Indian.

## 1. Buyer reality (this drives everything)

- **70%+ of orders are COD** for tier-2/3 audiences. Plan finances accordingly.
- **RTO baseline is 25–35%** without intervention. Below 20% is good, below 15% is excellent.
- **Average device is mid-range Android** on 4G. Pages must be <2s on 3G simulator.
- **Trust is the bottleneck.** Indian buyers fear being scammed more than missing out.
- **Hinglish converts.** Pure English alienates tier-2/3, pure Hindi alienates metros.
- **Price-point matters more than discount %.** ₹999 with no discount > ₹1,999 with 50% off.
- **Women are the dominant D2C buyer.** ~70%+ of impulse purchase decisions in our category mix (kitchen, beauty, home, kids, decor, fashion, jewelry, wellness) are female-driven. This is the single highest-converting demographic on Meta India and is encoded as KPI #13 in `winning-product-criteria` — a product that misses the female-buyer fit needs exceptional margin (≥4×) to be worth launching.

### Female-buyer-fit categories (KPI #13 = YES)

Default to these for fastest scaling:
- **Kitchen & cooking** — gadgets, choppers, organizers, food storage
- **Home decor & cleaning** — lights, organizers, cleaning tools, ambient
- **Beauty & personal care** — skincare tools, hair, grooming (women + babies)
- **Kids & baby** — toys, learning, feeding, safety
- **Fashion accessories** — jewelry, bags, scarves, hair accessories
- **Wellness (non-medical)** — posture, foot massage, sleep aids, ergonomic

### Male-skew categories (KPI #13 typically NO)

Launch only with stronger margin + sharper hook:
- Tools, hardware, automotive, electronics-heavy, fitness equipment, gaming
- Men's grooming is a special case — works but smaller pool, higher CAC

## 2. Pricing tiers (memorize)

| Tier | Band | RTO | When to use |
|---|---|---|---|
| Impulse | ₹299–₹699 | Low | Best for cold COD; volume game |
| **Sweet spot** | **₹699–₹1,499** | **Medium** | **Default — best margin × RTO** |
| Considered | ₹1,499–₹2,999 | High | Strong creative + COD verification |
| Premium | ₹2,999+ | Very high COD | Push prepaid; COD with disincentive |

For new SKUs, default to sweet spot unless `product-research` justifies otherwise.

## 3. COD / RTO management

**Verification gate (mandatory)**

- COD orders ≤ ₹999 → email confirm only
- COD orders ₹999–₹1,999 → email + WhatsApp/SMS confirm; cancel after 24h silence
- COD orders > ₹1,999 → phone confirm; require explicit YES
- Repeat customer (≥2 prepaid orders) → skip verification

**Pincode strategy**

- Maintain `docs/limits.md → cod_blocked_pincodes` — high-RTO postal codes
- Add a pincode after 2 RTOs from it
- Maintain `cod_blocked_phones` — same logic per phone

**Prepaid incentives (preferred over COD penalties)**

- 10% off on prepaid (works better than ₹40 COD fee)
- "Free shipping unlocked at prepaid" framing on cart page
- WhatsApp UPI link in confirmation email — recover ~15% to prepaid

## 4. Festival calendar (Hindu lunar — confirm exact dates yearly)

| Window | Festival | Product fit | Sale lead time |
|---|---|---|---|
| Mid-Aug | Independence Day | Broad | T-7 |
| Late Aug | Raksha Bandhan | Gifting (sister) | T-14 |
| Sep | Onam (Kerala), Ganesh Chaturthi | Regional | T-14 |
| Sep–Oct | Navratri / Durga Puja | Apparel, decor | T-14 |
| Oct–Nov | **Diwali (PEAK)** + Karwa Chauth + Dhanteras | Everything | T-21 |
| Nov | Bhai Dooj | Gifting (brother) | T-7 |
| Late Dec | Christmas + NYE | Gifting, gadgets | T-14 |
| Jan 14 | Makar Sankranti / Pongal | Regional, kitchen | T-7 |
| Jan 26 | Republic Day | Broad | T-7 |
| Feb 14 | Valentine's | Gifting, accessories | T-14 |
| March | Holi | Apparel, color-safe | T-7 |

**Pitru Paksha (~mid-Sep, 16 days)** — historically weak for celebratory purchases in North India. Don't launch celebratory products into this window.

## 5. Language strategy

- **Default copy**: Hinglish (Hindi words in Roman script). Example: "Aapke neck pain ka solution — sirf ₹799 mein, COD available!"
- **Headlines**: Hinglish hook + English CTA. "5 minute mein neck pain gone — Order Now"
- **Voiceover**: Hinglish, energetic, casual. Use words like "bhai", "yaar", "scene", "mast", "kamal"
- **Tier-2/3 emphasis**: lean Hindi-heavy
- **Metros (Mumbai/Delhi/Blr/Hyd/Pune)**: English acceptable, Hinglish still wins on social
- **South (TN/KL/AP/TG)**: English by default; if scaling, add Tamil/Telugu/Malayalam variants
- **Avoid**: Sanskritized Hindi (sounds formal/preachy), pure Urdu (limited reach), region-specific slang outside that region

## 6. Suppliers — India-specific sourcing

| Source | Lead time | When to use |
|---|---|---|
| **IndiaMART** | 3-7 days domestic | Default for India-stock dropshipping. Negotiate hard. |
| **Meesho supplier panel** | 5-10 days | Large catalog, competitive pricing, verified suppliers |
| **AliExpress + agent (Sourcing Bro / Eprolo etc.)** | 12-20 days | Better margins, longer ETA, accept higher RTO |
| **Local manufacturer (D2C)** | 7-14 days | Best margins at scale; demand 100-piece MOQ minimum |
| **Amazon/Flipkart sellers (re-stock)** | 2-5 days | Only when you can mark up 2x; risky |

Always validate with sample order before launching ads. Hand sample address to a friend, time the delivery, photograph unboxing → use as creative.

## 7. Couriers (default mix)

- **Shiprocket / Pickrr / iThink** — aggregators; default for small operators (best courier per pincode auto-routed)
- **Delhivery** — direct, reliable, slightly pricier; ideal for >100 orders/day
- **DTDC, Ekart, XpressBees** — backups; quality varies

Always use a courier with COD remittance ≤ T+7 days. Cash flow dies otherwise.

## 8. Pixel / CAPI for India

- Install Meta Pixel + Conversions API (CAPI) — non-negotiable. iOS attribution loss + Android browser quirks make CAPI the only reliable signal.
- Standard events: PageView, ViewContent, AddToCart, InitiateCheckout, **Purchase** (this is the optimization event)
- Send `cod_confirmed` as the de-duplicated true Purchase event for COD-heavy stores → trains Meta on real revenue, not RTO'd revenue
- Hash all PII per Meta's spec
- Use deduplication keys to avoid double-counting

## 9. Meta Ads tactics specific to India

- **Operator schedule windows** (operator's tested SOP):
  - **4:00 AM IST** — schedule new test ad sets to start. India auction is cheapest here.
  - **12:00 AM IST** — schedule budget changes for scaling. Learning re-stabilizes by morning.
  - Never launch tests live during the Indian working day — auction is more expensive and learning is noisier.
- **Lowest CPM windows**: 11pm–2am IST and 7am–9am IST (commute scrolling). Schedule heavier delivery there.
- **India CPM benchmark**: ₹50-150 per 1,000 impressions is the healthy band. Above ₹200 sustained = audience or creative problem.
- **Avoid**: Tuesday early-morning spike days where political news dominates feed
- **Placements**: Reels and Story drive best CPM-to-ROAS in tier-2/3; Feed dominates metros
- **Languages targeting**: do not over-restrict; let Advantage+ Audience figure out language affinity
- **Lookalikes**: 1% LAL of last-90d-purchasers > interests for cold scaling once you have 1000+ purchases
- **Catalog/Advantage+ Shopping** kicks in beautifully once 10+ SKUs have ≥50 purchases each
- **Testing structure** (per `ad-scaling-rules` Operator SOP): ABO single-interest at ₹200/ad set, 5 ad sets Day 1 + 5 more Day 2. CPP-led decisions, not ROAS.

### India geo exclusions (mandatory for COD)

Always exclude the following regions in every Meta ad set during testing and scaling — they have structurally lower delivery rates and significantly higher RTO in COD:

- **Seven Sisters states** (Northeast India): Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Tripura
- **Jammu & Kashmir** + Ladakh
- High-RTO pincodes from `docs/limits.md → cod_blocked_pincodes`

Metros and tier-2/3 mainland India remain the productive ad geography. Re-evaluate the Northeast/J&K exclusion only after the account hits ≥1,000 confirmed purchases and you can A/B test geos with real RTO data per region.

### Indian creative-quality benchmarks (post-launch)

| Metric | Healthy | Warning | Kill signal |
|---|---|---|---|
| **CPP** (Cost Per Purchase) | ≤ 8% of SP (Target) | 8-12% of SP | > 12% of SP for 2 days |
| **Hook Rate** (3-sec views ÷ impressions) | ≥ 30% | 20-30% — creative is borderline | < 20% — creative is the problem, not the audience |
| **CTR** (link) | ≥ 1% (testing) / ≥ 2% (scaling) | 0.8-1% | < 0.8% at ad-set level after 48-72h |
| **CPC** | < ₹7.5 (testing) / < ₹5 (scaling) | ₹7.5-12 | > ₹12 sustained |
| **CPM** | ₹50-150 | ₹150-200 | > ₹200 sustained = bad audience-creative fit |

CPP is the single north-star metric — the others are diagnostic. ROAS is a **vanity metric in India COD** until reconciled against actual delivered revenue (per `ad-scaling-rules` Phase 7).

## 10. GST and legal

- Display GST-inclusive prices (Indian buyer expectation; surprise GST at checkout = abandonment)
- HSN code in metafields per product
- Mandatory invoice with GST > ₹40L turnover
- Returns/Refund policy must be linked in footer (consumer protection law)
- Store address, phone, email visible — buyers check; absence = scam vibe

## 11. Anti-scam trust elements (every product page)

- **Phone number visible** (even WhatsApp Business is fine)
- COD badge prominent
- "100% Pure India Stock" or "Imported, ships from <city>" — be honest
- Customer photo reviews (UGC asks via NPS email)
- Visible return window (7-day no-questions even if you really do 3-day; the framing matters)
- Trust badges (Razorpay, secure checkout)

## 12. Cash-flow rhythm (operator hygiene)

- Daily: track COD remittance vs ad spend; ratio should be ≥1.4 weekly
- Weekly: pay suppliers from prepaid receipts only — never from COD float
- Monthly: tax provision 10% of net profit + 18% GST collected
- Maintain 30-day operating buffer in business account before scaling

## 13. Anti-patterns (do not do)

- ❌ Don't use AliExpress 20-day shipping without disclosing — refund tsunami
- ❌ Don't run health-claim products (kadha, fat-burner, etc.) — Meta ban + legal risk
- ❌ Don't fake countdown timers / fake stock — Indian buyers Google before COD
- ❌ Don't use celebrity images / Bollywood references without rights
- ❌ Don't push COD on premium-priced gadgets — RTO will eat you alive
- ❌ Don't skip the confirmation call/email on COD > ₹999
- ❌ Don't launch a product without ordering a sample yourself first
