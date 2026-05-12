# EcomBudgetStore — Shopify UI Design Spec

**Goal:** A professional, high-conversion Shopify storefront tuned for an Indian dropshipping audience (tier-2/3 emphasis, mobile-first, COD-heavy, ₹699–₹1,499 sweet spot).

**Stack assumption:** Dawn-family theme (or any Dawn-derived theme) on the live `ecombudgetstore.com` store, plus PageFly Page Builder for landing pages and advertorials. Razorpay Magic Checkout already installed.

**Scope:** This doc covers Home, Product, Add-to-Cart (mini-cart), and Checkout. Read in order — each later page assumes the earlier system is in place.

> 📐 **Date:** 2026-05-12 · **Owner:** operator + `store-manager` agent for enrichments.

---

## 1. Design System

The foundation. Every page below uses these tokens.

### Color palette

Tuned for India market — saffron (warmth, festivity), teal (trust, modernity), cream (premium, calm). High contrast for outdoor mobile use.

| Token | Hex | Use |
|---|---|---|
| Primary 600 (saffron) | `#FF6A00` | Primary CTAs, hover, sale badges |
| Primary 400 | `#FF8533` | CTA hover, gradient bottoms |
| Accent 500 (teal) | `#0FB8A3` | Secondary actions, links, success states, COD badge |
| Accent 700 (deep teal) | `#0A766B` | Deep hover, trust strips |
| Cream 50 | `#FBF8F1` | Page background, hero secondary |
| Cream 100 | `#F5EFDE` | Card backgrounds, alternating sections |
| Ink 900 | `#1A1A1A` | Body text, headings |
| Ink 600 | `#525261` | Secondary text, captions |
| Bad | `#EF4444` | Error states, low-stock urgency (use sparingly) |
| OK | `#22C55E` | Success, "In stock", verified badges |

Apply in Theme Editor → Theme settings → Colors. Set `Button background = #FF6A00`, `Button text = #FFFFFF`, `Accent link = #0FB8A3`, `Page background = #FBF8F1`, `Body text = #1A1A1A`.

### Typography

Indian buyers respond well to clean modern sans-serifs. Avoid Sanskrit-styled fonts and ornate serifs (they read as cliché).

| Use | Font | Weight | Notes |
|---|---|---|---|
| Headings (H1–H4) | **DM Sans** | 700, 800 | Bold, tightly tracked. Available free in Shopify Theme Editor fonts. |
| Body | **Inter** | 400, 500 | Reads cleanly at all sizes. Free in Theme Editor. |
| Price ticker | DM Sans | 800 | Use slightly larger size for the price (28-32px on mobile). |
| Captions | Inter | 500 | 12-14px. |

Apply in Theme Editor → Theme settings → Typography. Heading: DM Sans, body: Inter.

### Spacing & layout

- Base unit: **8px grid**. All paddings/margins are multiples of 8.
- Container max-width: **1200px desktop, 100% mobile** with 16px side padding.
- Section vertical rhythm: **64px** between major sections on desktop, **40px** on mobile.
- Card padding: **24px** inside cards.
- Touch targets: **min 48×48px** (Android material guideline) — critical for tier-2/3 cheap phones.

### Components (consistent across pages)

1. **Primary CTA button** — saffron `#FF6A00` fill, white text, 12px vertical padding, full-width on mobile, slight shadow.
2. **Secondary CTA** — outline teal `#0FB8A3` border, teal text, same dimensions.
3. **Trust pill** — pill-shaped, white background, 1px teal border, 10-12px inset, icon + 1-line text.
4. **Sale badge** — saffron filled pill, top-left of product card, white text, e.g., "SAVE ₹450".
5. **COD pill** — teal filled, white text, "COD AVAILABLE" — appears on every product card AND in product header.

---

## 2. Home page

The homepage's job is **3 seconds**: do they understand what you sell, do they trust you, and is there a clear primary action. India tier-2/3 buyers on mid-range Android phones on 4G are the audience — every section must work at 380px width and load fast.

### Section order (top → bottom)

| # | Section | Height (mobile) | Purpose |
|---|---|---|---|
| 1 | Announcement bar | 36px | Free shipping + COD + return — always visible |
| 2 | Header / nav | 64px | Logo + search + cart + WhatsApp |
| 3 | Hero | 540px | One promise, one CTA |
| 4 | Trust strip | 88px | 4 trust pills horizontally |
| 5 | Featured collection — Summer Essentials | 480px | 4-product carousel, sale badges |
| 6 | Single-product spotlight | 400px | Your hero SKU with deep story |
| 7 | "Why EcomBudgetStore" | 320px | 3-column value props |
| 8 | Second collection — Home Workout / Health | 480px | Second category showcase |
| 9 | Reviews carousel (Judge.me) | 320px | 6-8 star ratings with text |
| 10 | UGC / Instagram embed | 400px | If you have any |
| 11 | FAQ accordion | Auto | 6-8 generic + India-specific FAQs |
| 12 | Footer | 320px | 4-column links + WhatsApp |

### Section-by-section spec

#### Section 1 — Announcement bar

- Background: saffron `#FF6A00`. Text: white. Height: 36px.
- Single line, no animation: **"⚡ Free shipping ₹499+ · 💵 COD across India · 🔄 7-day easy returns"**
- Implementation: Theme Editor → Announcement bar section → set text + background color.

#### Section 2 — Header

Layout (mobile):
```
[ ≡ ]  [    LOGO    ]  [ 🔍 ] [ 💬 ] [ 🛒 ]
```
- Logo: square 32×32, "EcomBudgetStore" wordmark in DM Sans 700.
- WhatsApp icon links to `https://wa.me/[number]` — non-negotiable trust signal for India.
- Search icon expands a full-width search bar (Shopify Search & Discovery handles this).
- Cart icon shows count badge.

Implementation: Theme Editor → Header section → enable search, sticky on scroll, enable WhatsApp via custom Liquid block.

#### Section 3 — Hero

**Single hero, single message, single CTA.** No carousels — they dilute attention and load slowly.

```
┌────────────────────────────────────────┐
│  [Background image: product lifestyle  │
│   on cream backdrop, slight overlay]   │
│                                        │
│  Smart picks for everyday              │
│  Indian homes.                         │
│  ──────────────                        │
│  Verified products. Honest prices.     │
│  COD across India.                     │
│                                        │
│  [  Shop Now  →  ]   ← saffron filled  │
│  [  Featured collection  ]  ← outline  │
└────────────────────────────────────────┘
```

- Heading: 36-44px on mobile, 64-72px on desktop. DM Sans 800.
- Subheading: 16-18px Inter 500, ink-600.
- Primary CTA: "Shop Now" → `/collections/all`. Saffron fill.
- Secondary CTA: "View Featured Collection" → `/collections/summer-essentials`. Teal outline.
- Image: 2048×1152 hero. If you don't have one, generate via `creative-studio` + Higgsfield.

Implementation: Theme Editor → Image banner / Image with text section → upload hero, set heading + CTAs.

#### Section 4 — Trust strip

A horizontal row of 4 cards with icons. Background `#F5EFDE` (cream 100) to break visual rhythm.

```
[🚚 Free Shipping]  [💵 COD Available]  [🔄 7-Day Returns]  [🔒 Secure Razorpay]
 On orders ₹499+    Pan-India delivery    No questions asked   UPI · Cards · Wallets
```

- Each card: 80×80 icon, 14px headline, 12px subline.
- 4 columns desktop, 2×2 grid mobile.
- Implementation: Theme Editor → Multicolumn section → 4 columns, icon + heading + body each.

#### Section 5 — Featured collection: Summer Essentials

A 4-product horizontal carousel. Each card shows hero image, sale badge, price + compare-at, COD pill, "Quick add" button.

Card spec:
```
┌─────────────────┐
│ [SAVE ₹400]     │  ← saffron pill, top-left
│   Hero image    │
│   (aspect 1:1)  │
├─────────────────┤
│ Product title   │
│ ₹899  ̶₹̶1̶,̶3̶0̶0̶     │  ← price + struck compare-at
│ 💵 COD          │  ← teal pill
│ [+ Add to cart] │
└─────────────────┘
```

- 4 products visible on desktop, 2.5 visible mobile (with edge peek).
- Heading above: "**Summer Essentials**" + small subline "Beat the heat. Save more."
- Implementation: Theme Editor → Featured collection section → select `summer-essentials` collection.

#### Section 6 — Single-product spotlight

Your top SKU deserves dedicated real estate. Bigger image, more copy, stronger CTA.

```
┌────────────────────────────┬─────────────┐
│  Large lifestyle image      │ Hero SKU    │
│  (or 15-sec video)          │ Title       │
│  ratio 4:5 vertical          │             │
│                            │ ₹899 ̶₹̶1̶,̶4̶9̶9̶  │
│                            │ Save ₹600   │
│                            │             │
│                            │ One-line    │
│                            │ benefit     │
│                            │             │
│                            │ [Shop NF-022]│
│                            │ 💵 COD avail │
└────────────────────────────┴─────────────┘
```

- Desktop: 2-column. Mobile: stacked.
- Implementation: Theme Editor → Featured product section.

#### Section 7 — "Why EcomBudgetStore"

3 columns, value-prop based. Not generic feel-good fluff — specific, India-relevant.

```
┌────────────┬────────────┬────────────┐
│ 🇮🇳         │ ⚡          │ 💬         │
│ Made for   │ Fast        │ Real       │
│ Indian     │ across      │ humans on  │
│ buyers     │ India       │ WhatsApp   │
│            │             │            │
│ Honest     │ Dispatch    │ Mon–Sat    │
│ India-     │ within 24h. │ 10am–7pm   │
│ inclusive  │ 4–7 day     │ on WA.     │
│ pricing.   │ delivery.   │ Reply in   │
│            │             │ &lt;24h.      │
└────────────┴────────────┴────────────┘
```

- Padding: 24px per column. Background: cream 50 (`#FBF8F1`).
- Implementation: Theme Editor → Multicolumn section, 3 columns, large icon top, heading, 2-line body.

#### Section 8 — Second collection: Home Workout / Health & Beauty

Same component as Section 5, different collection. Helps buyers who didn't click Summer.

#### Section 9 — Reviews carousel

Pull from Judge.me. Auto-rotate 6-8 5★ reviews with photo if available.

- Each review card: 5★ visual + 60-character snippet + customer first name + city ("Priya from Jaipur").
- If no reviews yet (pre-launch), HIDE this section or use a placeholder: "Reviews coming soon — be one of the first to share your experience."
- Implementation: Judge.me's "Carousel" widget → drag block into homepage.

#### Section 10 — UGC / Instagram

Hide until you have content. If active: Instagram feed widget (free apps) showing latest 6-9 posts.

#### Section 11 — FAQ accordion

8 FAQs total. First 3 generic, next 5 India-specific. Theme-rendered accordion.

```
+ How long does delivery take?
+ Do you offer Cash on Delivery?
+ What is your return policy?
+ Is GST included in the price?
+ Which payment methods do you accept?
+ How do I track my order?
+ Can I change my delivery address?
+ Do you ship to remote pincodes?
```

Implementation: Theme Editor → Collapsible content section → 8 rows.

#### Section 12 — Footer

4-column desktop, stacks on mobile.

```
Shop                Help               About             Connect
─────              ─────              ─────             ─────
All Products       Refund Policy      About Us          WhatsApp
Health & Beauty    Shipping Policy    Contact           Instagram (icon)
For Your Home      Privacy Policy     [our story]       Newsletter signup
Summer Essentials  Terms of Service                     
Home Workout       Contact Us                           
```

Bottom row: copyright, GSTIN, FSSAI/BIS if applicable, "Made with ❤️ in Sonipat, Haryana".

---

## 3. Product page

The single highest-leverage page in a dropshipping store. Indian buyers spend 60-120 seconds here deciding to buy. Every section optimizes one decision factor.

### Section order (top → bottom)

| # | Section | Purpose |
|---|---|---|
| 1 | Breadcrumb + back to collection | Orientation |
| 2 | Image gallery (left) + product info (right) — desktop | Primary visual + decision |
| 2-mobile | Image gallery → product info stacked | Mobile primary |
| 3 | Sticky add-to-cart bar (mobile) | Conversion lever |
| 4 | Long-form description | Substance |
| 5 | Specs table | Trust |
| 6 | Comparison: this vs generic | Trust |
| 7 | Reviews (Judge.me widget) | Social proof |
| 8 | FAQ | De-risk |
| 9 | You may also like | Cross-sell |
| 10 | Recently viewed | Re-engage |
| 11 | Footer | Same as home |

### Section-by-section spec

#### Section 1 — Breadcrumb

Single line: `Home / Health & Beauty / Posture Corrector`

#### Section 2 — Hero: Image gallery + product info

**Image gallery (left half desktop, top stack mobile):**
- 5+ images, **thumbnail strip below main image**.
- Zoom on click / pinch on mobile.
- 1 image must be lifestyle (in-use), 1 must be scale (next to hand or phone), 1 must be packaging.
- First image preloads instantly (priority hint).
- Optional: 1 short video clip (10-15s vertical) showing product in use.

**Product info (right half desktop):**
```
[POSTURE CORRECTOR]            ← uppercase product type, small grey
Adjustable Posture Corrector
Belt — Back Support for Desk
Work

★★★★★ 4.8 (47 reviews)         ← Judge.me badge

₹699   ̶₹̶1̶,̶0̶5̶0̶  SAVE 33%       ← bold price + strike + saffron pill

💵 COD Available    🚚 Free shipping ₹499+   🔄 7-day return

Size:  [ S ]  [ M ]  [ L ]  [ XL ]   ← if variants

Quantity:  [ – ] 1 [ + ]

[       Add to Cart       ]   ← FULL-WIDTH saffron CTA
[       Buy it Now        ]   ← teal outline secondary

────────────────────────────
✓ Dispatched within 24 hours
✓ Pan-India delivery 4–7 days
✓ COD with ₹49 handling fee
✓ Razorpay secure checkout
```

- **Title:** 24-32px on mobile, DM Sans 700.
- **Price:** 28-32px DM Sans 800 saffron, strike compare-at next to it.
- **Add to Cart button:** Saffron `#FF6A00` fill, full-width mobile, 48px tall.
- **Trust pills:** Below CTAs, NOT above (don't compete with the buying decision).
- **Bullets:** Inter 500, ink-600, single-line each.

Implementation: Theme Editor → Product information section → reorder blocks: image gallery, title, rating, price, variant picker, quantity, buttons, then "trust bullets" via custom Liquid block.

#### Section 3 — Sticky add-to-cart bar (mobile)

Appears when user scrolls past the main CTA. Bottom-fixed, full-width.

```
┌────────────────────────────────────┐
│ [thumb] ₹699   [    Add to Cart   ]│  ← saffron CTA, right-aligned
└────────────────────────────────────┘
```

- Sticky only mobile (desktop has its own sidebar).
- Enable: Theme Editor → Sticky add-to-cart section → ON for mobile, OFF for desktop.

#### Section 4 — Long-form description (HTML body we already wrote)

The structured body_html from the recent batch — trust strip, "Why you'll love it", "How it works", specs, "What's in the box", shipping, returns, FAQ. Already API-implemented.

#### Section 5 — Specs table

Already in body_html. If theme has a standalone "Spec table" section block, duplicate there for cleaner styling.

#### Section 6 — Comparison: this vs generic

Critical for India market — buyers Google before COD-ing. Pre-empt their comparison.

```
What you get vs a generic belt
┌─────────────────────┬──────────────────┬──────────────────┐
│                     │ Posture Corrector│ Generic ₹299 belt│
├─────────────────────┼──────────────────┼──────────────────┤
│ Breathable mesh     │      ✓           │       ✗          │
│ Adjustable fit      │      ✓           │   one-size       │
│ Discreet under shirt│      ✓           │   bulky          │
│ 7-day return        │      ✓           │       ✗          │
│ Indian buyer support│ WhatsApp + email │       ✗          │
└─────────────────────┴──────────────────┴──────────────────┘
```

Implementation: Theme Editor → Multicolumn or Custom Liquid section. PageFly is easier here if Dawn lacks a native comparison block.

#### Section 7 — Reviews

Judge.me widget. Shows 5-star average + photo grid + filterable by rating. Configure: Show "verified buyer" badges, allow photo uploads, automated email request 7 days post-delivery.

#### Section 8 — FAQ

Already in body_html. Theme-rendered version with arrow icons looks cleaner — add a Collapsible content section pulling the same FAQs.

#### Section 9 — You may also like

4-card carousel showing complementary products. Use Shopify's native `Related products` section + tag-based smart collection. No paid app needed.

#### Section 10 — Recently viewed

Auto-populated by theme. Helps users who comparison-shopped within your store.

---

## 4. Add-to-cart (mini-cart drawer)

When buyer clicks "Add to Cart", a slide-in drawer appears. **Don't** redirect to cart page — that's a 20-30% drop-off vector.

### Drawer spec (300px wide desktop, full-width mobile)

```
┌─────────────────────────────────┐
│  Cart                       [×] │
├─────────────────────────────────┤
│ ┌──┐ Posture Corrector          │
│ │im│ Size M  ·  Qty 1           │
│ └──┘ ₹699          [trash icon] │
│                                  │
│ ┌──┐ Push Up Board               │
│ │im│ Qty 1                       │
│ └──┘ ₹999          [trash icon] │
├─────────────────────────────────┤
│ 🎯 Spend ₹500 more for FREE     │
│ SHIPPING                        │  ← progress bar with %
│ ███████░░░░ 67%                  │
├─────────────────────────────────┤
│ Apply discount code             │
│ [_________________] [ Apply ]   │
├─────────────────────────────────┤
│ Subtotal:           ₹1,698       │
│ Shipping: calculated at checkout│
├─────────────────────────────────┤
│ [       Checkout (₹1,698)     ] │  ← saffron full-width
│       View cart →                │  ← text link below
└─────────────────────────────────┘
```

Key conversion levers:
1. **Stays on product page** — no redirect to `/cart` until they explicitly click "View cart" or "Checkout"
2. **Free shipping progress bar** — anchors the upsell at +₹500 to hit ₹499 threshold (uses cart subtotal)
3. **Discount code input present** — but small / collapsed by default (don't suggest buyers should hunt for codes)
4. **Cross-sell strip below items** — "Frequently bought together" suggestions (use Shopify metafield `complementary_products` + theme block)

Implementation: most Dawn-family themes have a mini-cart drawer built-in. Enable via Theme Editor → Cart section → Cart type = "Drawer" instead of "Page".

If your theme has no drawer, the simplest paid app is Shopify's free **"Cart Drawer"** block in Online Store 2.0 themes. PageFly also handles this if needed.

---

## 5. Checkout

Shopify's checkout is mostly fixed (Shopify Plus needed for full customization). But there are 5 high-impact optimizations available on Basic plan.

### Step 1 — Use Razorpay Magic Checkout (already installed ✓)

This replaces Shopify's default 3-step checkout with a 1-step express checkout. Massive India CVR uplift because:
- One-page form, no multi-step navigation
- Auto-detects pincode, fills shipping calculation
- UPI primary, cards secondary, COD third
- Phone OTP authentication (faster than email)

Verify: Settings → Payments → Razorpay Magic Checkout is enabled as the primary payment method.

### Step 2 — Checkout customizations (Settings → Checkout)

- **Customer accounts**: set to "Optional" — don't force account creation, kills 5-10% of conversions
- **Address autocomplete**: turn ON (Google-powered, free on Basic)
- **Order notes**: turn OFF unless you need them (one less form field)
- **Tipping**: turn OFF (no Indian buyer expects to tip an e-commerce store)
- **Phone number**: required (essential for COD verification flow)

### Step 3 — Branding pass

Settings → Checkout → Customize checkout. Set:
- Primary button color: `#FF6A00` (saffron — matches site)
- Accent color: `#0FB8A3` (teal)
- Logo: square version uploaded
- Background: solid `#FBF8F1` cream

### Step 4 — Express payment buttons (top of checkout)

Above the form, show express payment options to skip data entry:
- UPI (Razorpay native)
- Google Pay
- Phone Pe (if Razorpay Magic Checkout supports it for your account)
- Shop Pay (Shopify native, less relevant in India)

### Step 5 — Trust footer on checkout

Shopify's checkout has a `Policies & footer` section. Add:
- Refund policy link
- Privacy policy link
- WhatsApp number (last-mile rescue for cart abandoners)
- "Secured by Razorpay" badge

---

## 6. Implementation paths

For each page, here's the simplest implementation route:

### Home

- **All sections except hero image and FAQ accordion can be configured in Theme Editor** — Dawn supports all blocks needed.
- **Hero image**: source from `creative-studio` + Higgsfield (or Canva for quick start). Recommended brief: "Clean Indian home flat-lay, teal and cream palette, no people, product-lifestyle feel, bright natural light, 2048×1152."
- **FAQ accordion**: Theme Editor's Collapsible content section.
- **Reviews carousel**: Judge.me widget.

Effort: ~45 minutes if hero image is ready.

### Product page

- **Sections 1, 2, 4, 5, 7-10** are stock Dawn blocks — configure in Theme Editor.
- **Section 3 (sticky CTA)**: Dawn-family themes include this. Some need a free add-on like "Sticky Add to Cart by Coderbat".
- **Section 6 (Comparison table)**: Easiest via PageFly's table block dragged into the product page template. Native Liquid edit possible but riskier.

Effort: ~30 minutes per product if sections are wired once across the Product template.

### Add-to-cart drawer

- Theme Editor → Cart → "Drawer" type. Configures the basic drawer.
- Free shipping progress bar: most newer Dawn-family themes have this built-in. If not, install **"Free Shipping Bar by Hextom"** (free).
- Cross-sell strip: set complementary_products metafield + enable the Theme block.

Effort: ~20 minutes.

### Checkout

- Razorpay Magic Checkout: already installed.
- Branding pass: 10 minutes in Settings → Checkout.
- Express payment: configured inside Razorpay Magic Checkout settings, not in Shopify directly.

Effort: ~30 minutes.

---

## 7. Mobile-first checklist (verify before publishing)

Open Theme Editor → click mobile preview icon (top center). Check:

- [ ] Announcement bar text doesn't wrap to 3 lines on 380px width
- [ ] Hero image fills full viewport width, no side gaps
- [ ] Hero CTA visible above the fold (no scroll required) on a 6.1" phone
- [ ] Trust strip wraps to 2×2 grid cleanly
- [ ] Featured collection shows 2.5 cards (edge peek for swipe affordance)
- [ ] Product card CTA buttons are 48px tall (thumb-tappable)
- [ ] Product page sticky cart bar appears on scroll past hero
- [ ] Image gallery zoom works with pinch
- [ ] Mini-cart drawer slides in from right (or top on small screens)
- [ ] Checkout loads &lt; 2 seconds on 3G simulator (Chrome DevTools → Network → Slow 3G)
- [ ] Any text under 14px is exception — minimum 14px body, 12px only for captions

---

## 8. Anti-patterns (don't do these)

- ❌ **Carousels in the hero**: dilute attention, slow load, low engagement
- ❌ **Pop-up on page load**: 10-15% bounce penalty; only show after 30s or 50% scroll
- ❌ **Wheel-of-fortune spinner**: dated, cheap-feeling, India buyer trust killer
- ❌ **Multiple competing CTAs in the hero**: pick one primary action
- ❌ **Below-the-fold trust signals**: trust pills MUST be visible in first scroll on every page
- ❌ **Hidden COD pill**: COD must be on every product card, every product page, every checkout step
- ❌ **Long checkout forms**: every extra field = 2-5% CVR loss
- ❌ **No WhatsApp link in header**: tier-2/3 buyers verify via WhatsApp before COD-ing
- ❌ **Pure English copy on tier-2/3 ads**: Hinglish in ads, English on storefront is fine — but ad-to-page voice mismatch hurts
- ❌ **Auto-playing video with sound**: muted is mandatory
- ❌ **Reviews under 5 visible**: if you have &lt;5 reviews, hide the count and show only "5★ rating" or hide section entirely

---

## 9. Conversion KPIs to track post-implementation

Once live, measure these in `marketing-analytics` and the dashboard:

| KPI | Target (cold traffic) | Target (retargeting) |
|---|---|---|
| Homepage → Product CVR | ≥18% | ≥30% |
| Product page → ATC CVR | ≥6% | ≥12% |
| ATC → Checkout CVR | ≥55% | ≥70% |
| Checkout → Order CVR | ≥45% | ≥60% |
| End-to-end (LP → Order) | ≥1.5% | ≥4% |

If checkout → order CVR drops below 40%, **always** investigate within 24 hours — that's the smallest funnel and any drop signals a real break (payment method outage, COD restriction, address autocomplete failure).

---

## 10. Sequence of work for the operator

If you want to do this in one afternoon (3-4 hours total):

1. **Theme settings pass** (10 min): set palette + typography per Section 1.
2. **Homepage rebuild** (45 min): sections 1-7 first, then 8-12 if time. Hero image can be a stock photo placeholder if Higgsfield isn't ready.
3. **Product template rebuild** (30 min, applies to ALL products): configure once, reuse.
4. **Mini-cart drawer** (20 min): enable drawer type, configure free shipping bar.
5. **Checkout branding** (15 min): logo, colors, customer accounts to optional.
6. **Mobile sanity pass** (15 min): the checklist in Section 7.
7. **Publish** when all 6 above pass.

After publishing, run `daily-ops` once to verify Pixel events still fire correctly through the new layout, and check Judge.me widget renders. Then it's done.
