---
name: conversion-page-blueprint
description: The anatomy of high-converting Shopify product pages and home pages for Indian D2C — what goes where, the buying-psychology order, rich-description construction, and the per-page checklists. Used by store-manager when building or enriching any product page or the homepage. Never lay out a page by feel — follow this blueprint.
---

# Conversion Page Blueprint

A page is a salesperson: it must answer every question, handle every objection, and close the sale. Nothing on it is decorative — if an element doesn't sell, it shouldn't be there. Customers scroll in a predictable pattern, so the right thing must appear at the right moment.

This skill is the structure. The `docs/design/shopify-ui-spec.md` is the operator's Theme-Editor implementation guide — this skill is what `store-manager` applies when constructing the `body_html`, metafields, and section order. The products change; the layout does not.

---

## 1. Product page anatomy (the template — what goes in each slot)

Every high-converting product page follows the same vertical order:

| # | Slot | Contents |
|---|---|---|
| 1 | **Hero media** | Product image(s) — multiple angles or a GIF/short loop. First image preloads. |
| 2 | **Title + Offer badge** | Product title, offer badge (e.g., "BUY 1 GET 1", "SAVE ₹450") |
| 3 | **Rating** | ★ rating + review count (auto from Judge.me once it has data; hide if <5 reviews) |
| 4 | **Price block** | Sale price prominent, compare-at struck through, "Save ₹X / Y%" |
| 5 | **Trust strip** | Free Shipping · COD Available · Secure Returns — directly under price |
| 6 | **Buy button** | Full-width, "Order Now" / "Buy Now" / "Order COD" |
| 7 | **Payment icons** | UPI · Google Pay · PhonePe · COD — under the buy button |
| 8 | **Feature block 1** | Feature *headline* (benefit-driven) + 2 lines of why-it-matters + image/GIF on one side |
| 9 | **Feature block 2** | Second feature, image on the *opposite* side (visual rhythm). 2-3 feature blocks max. |
| 10 | **Customer reviews** | Pulled from the reviews app (Judge.me). Photo reviews where possible. |
| 11 | **FAQ — common questions** | The last-objection handler. 4-6 product-specific Qs. |

The richest content (feature blocks, GIFs, structured layout) is **NOT** built in the Theme Editor — it lives in the Shopify **product Description field** (`body_html`), which the theme renders as the Description block. `store-manager` constructs this; the operator just positions the Description block in Theme Editor.

---

## 2. The buying-psychology order (why the anatomy is fixed)

The sequence maps to how a human makes a purchase decision. Do not reorder.

| Stage | Element | Why it's there |
|---|---|---|
| **Attention** | Hero image | Brain processes images ~60,000× faster than text. The hero earns the first second. No strong hero → bounce. |
| **Interest** | Title + price + offer | Struck-through original makes the sale price feel like a win. Real urgency shifts the brain from *browsing* to *evaluating*. |
| **Trust** | Trust signals + payment icons | First objection is always "can I trust this store?" COD, returns, secure-payment icons answer it before it's asked. Critical in India. |
| **Desire** | Rich description + GIFs | Features don't sell; benefits do. "Non-slip rubber backing" = feature. "Stays put on wet floors — no more slipping" = benefit. Show, don't tell. |
| **Validation** | Reviews + photos | The buyer wants to buy but needs permission. "489 people bought this and love it" gives it. |
| **Resolution** | FAQ | The last holdout has one specific question. Answer it → they buy. Leave it → they "think about it" and never return. |

Every benefit headline must pass the **feature-vs-benefit test**: rewrite any spec as what it *does for the customer*. If the line describes the product, rewrite it to describe the customer's better life.

---

## 3. Rich description construction (the `body_html` method)

The description is a mini landing page inside one field — never a plain paragraph.

Structure (this is what `store-manager` writes into `body_html`; aligns with the structured-description batch already shipped):

1. Trust badge strip (Fast Dispatch · COD · 7-Day Return · GST Included)
2. **Why you'll love it** — 4-5 benefit bullets (verb/adjective-led, benefit not spec)
3. **How it works** — exactly 3 steps, effortless-sounding
4. Feature blocks — each: benefit headline + 2 lines + an image/GIF brief
5. **Specifications** — table; `[OPERATOR: confirm]` for unknowns, never fabricate
6. **What's in the box**
7. **Shipping & payment** — pan-India 4-7d, free prepaid ≥₹499, COD note
8. **Returns & warranty** — 7-day no-questions
9. **FAQ** — 4-6 product-specific (sizing, COD, delivery, returns, + product-specifics)
10. "Last updated: <date>"

Semantic HTML only — `h2/h3`, `ul`, `table`, `details/summary`, `strong`, `em`. No inline styles (themes strip them). No `script`/`iframe`.

---

## 4. AI prompt — product description (canonical reference)

When generating a description from a product link/details, this is the gold-standard prompt pattern. `store-manager` self-executes it using known product data + the store's English-only brand voice (it does not interrogate the operator unless data is genuinely missing):

> Before writing, establish: (1) product name + what it does, (2) target customer — age, lifestyle, the problem they have, (3) top 3-5 features, (4) price point + offers (BOGO / discount / free shipping), (5) brand tone. Then write a description structured as: for each of 3-5 features — a **benefit-driven headline** (e.g. "Stays put on wet floors", not "Non-slip rubber backing") + 2 lines on why the customer should care + a suggested image/GIF beside it. Also produce: a compelling title with an offer hook; 3-4 pre-purchase FAQ Qs with answers; a ≤160-char SEO meta description. Rules: **benefits not features** (the customer doesn't care it's made of X — they care what it does for them); tone matches the brand; every sentence either builds desire or removes doubt — nothing else.

**Always edit AI output.** It doesn't know real shipping times or real customer pain. Replace generic claims with specifics. Brand voice for EcomBudgetStore = English-only, India-aware, warm, value-focused (per prior decisions in this harness). No medical claims.

---

## 5. Home page anatomy + section order

| # | Section | Rule |
|---|---|---|
| 1 | Announcement bar | One line, ≤10 words. Best offer or shipping promise. |
| 2 | Hero | Headline ≤6 words, memorable, not generic ("One foam. Every room."). Supporting line ≤20 words (what you sell + why it matters). One CTA. 3-4 trust indicators with **specific numbers**. |
| 3 | Trust metrics | Must appear **before** the first product section. Real numbers only; if none yet, use "100+" and replace with real within 30 days. |
| 4 | Featured collection | Products within the first 2 scrolls. Linked to real collections. |
| 5 | How it works | 3-4 dead-simple steps. One-word title + one-line each. Effortless. |
| 6 | Use cases | 4-6 situations the customer uses the product. Short label + one sentence. Become image labels. |
| 7 | Reinforcement banner | Bold brand claim ≤8 words ("India's #1 ___") + supporting line + CTA with price. |
| 8 | Why choose us | 3-4 specific differentiators. Headline + 2 lines each. Specific, not "premium quality". |
| 9 | Reviews | Social proof before footer. Hide if no reviews. |
| 10 | FAQ | 5 product-specific Qs (not generic policy). |
| 11 | Footer | 4-column: Shop / Help / About / Connect + WhatsApp. |

Headlines everywhere: **3-6 words max**. "Premium quality" / "best in class" are banned — be specific or say nothing. Every brand section must *earn* the product section after it.

---

## 6. AI prompt — homepage content (canonical reference)

> Establish: what the store sells (niche, types, count); target customer; what makes it different from Amazon/Flipkart (speed/quality/curation/price/expertise); brand personality; current offer; the one FEELING a visitor should have; how the product works (3-4 steps); 4-6 use occasions. Then generate, in exact order: Announcement bar (≤10 words) · Hero (headline ≤6 words + supporting ≤20 + CTA + 3-4 numbered trust indicators) · How it works (3-4 one-word-title steps) · Use cases (4-6 label + sentence) · Reinforcement banner (≤8-word claim + line + CTA with price) · Why choose us (3-4 headline + 2 lines) · FAQ (5 product-specific). Rules: headlines 3-6 words; "premium quality"/"best in class" banned; trust metrics must be REAL (else "100+" placeholder, replace in 30 days); make someone STOP scrolling.

`store-manager` (with `india-localizer` for language) self-executes using EcomBudgetStore facts. Two different stores must produce different output — never template-feel.

---

## 7. Indian-compliance + merchandising notes

- **Country of origin** is required on every product for Indian compliance — set it.
- **Inventory tracking ON**; realistic quantities per location (per `inventory-thresholds` skill — 50-200 normal range).
- **SKU** = internal product code; use supplier code or our own scheme (e.g., NF-022).
- **Cost per item** field — track product + shipping + packaging so true margin is visible after gateway fees + RTO.
- **Shipping** — set package size + weight (shipping partners rate on this).
- **Bulk editor** — Products → select → Edit, for >10-product price/status/channel changes (respect `docs/limits.md` mass-update approval cap).

---

## 8. Product page checklist (store-manager verifies before un-drafting any SKU)

- [ ] 3+ product images from different angles
- [ ] Price anchored with a strikethrough compare-at
- [ ] Trust signals visible above the fold (COD · returns · payment icons)
- [ ] Description is rich structured content, not plain text
- [ ] Customer reviews present (or section hidden if <5)
- [ ] FAQ answers the top product-specific objections
- [ ] No `[OPERATOR: confirm]` placeholders remaining in body_html
- [ ] Country of origin + cost-per-item + SKU set
- [ ] Renders correctly on a 380px mobile viewport
- [ ] No medical/health claims, no fabricated stats

## 9. Homepage checklist

- [ ] Hero answers "what is this store?" in ≤6 words
- [ ] Trust metrics appear before the first product section
- [ ] Products appear within the first 2 scrolls
- [ ] Every brand section earns the product section after it
- [ ] Featured collections link to real, populated collections
- [ ] A competitor would NOT recognise it as a generic template
- [ ] Works on mobile

---

## Anti-patterns

- ❌ Plain-paragraph descriptions (no structure = no desire built)
- ❌ Features stated as specs instead of benefits
- ❌ Generic hero ("Welcome to our store", "Premium quality products")
- ❌ Trust metrics that are invented numbers (use "100+" honestly until real)
- ❌ Reordering the psychology sequence (e.g., reviews above price)
- ❌ Reusing identical homepage copy another store could use verbatim
- ❌ Building rich layout in Theme Editor instead of the Description field
