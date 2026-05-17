---
name: unit-economics
description: The Break-Even Calculator (BEC) model and Product Arsenal tracking schema from the Ecom Edge Product Arsenal workbook. Concrete formulas for Target CPP, breakeven quantity, net-profit margin accounting for RTO + delivery rate. Used by product-research (GO/HOLD economics), ads-manager (CPP kill/scale gate), store-manager (arsenal metafields), ops-planner (Notion Pipeline columns). Never approve a launch or judge an ad's CPP without running these numbers.
---

# Unit Economics — BEC model + Product Arsenal schema

Source: operator's `docs/product-arsenal/Ecom_Edge_Product_Arsenal.xlsx` (sheets: Products, BEC, Roposo). This skill is the canonical, versioned form of that workbook so every existing and new Shopify product is tracked and economically gated identically.

---

## 1. The Break-Even Calculator (BEC) — formulas (reverse-engineered, exact)

Worked from the sheet's own numbers (Selling ₹550, Cost ₹189, FAD 0.7, RTO 0.3, CPP ₹55, 100 orders → NET ₹17,610). Use these formulas verbatim.

### Inputs (per product)

| Symbol | Name | Meaning |
|---|---|---|
| `SP` | Selling price | What the customer pays (₹, GST-inclusive) |
| `C` | Cost | Product cost per unit (supplier landed) |
| `FAD` | Fulfilment/Delivery rate | Fraction of orders actually delivered (e.g., 0.70) |
| `RTO` | RTO rate | Fraction returned-to-origin = `1 − FAD` (e.g., 0.30) |
| `CPP` | Cost per purchase | Ad cost to acquire one order (₹) |
| `RTO_cost` | RTO cost per RTO'd order | Forward + return shipping eaten on a failed delivery (sheet: ₹72/RTO order) |
| `N` | Total orders | Orders placed (delivered + RTO'd) |

### Derived metrics

```
Profit per delivered order     = SP − C
Revenue                        = N × FAD × SP          (only delivered orders earn)
COGS                           = N × FAD × C
Gross profit                   = Revenue − COGS = N × FAD × (SP − C)
Gross margin %                 = Gross profit ÷ Revenue        (sheet: 65.6%)

Total ad cost                  = N × CPP                (paid on ALL orders, not just delivered)
Total RTO cost                 = N × RTO × RTO_cost
Total cost incurred            = Total ad cost + Total RTO cost

NET PROFIT                     = Gross profit − Total ad cost − Total RTO cost
Net margin %                   = NET PROFIT ÷ Revenue           (sheet: 45.7%)

Breakeven quantity             = Total cost incurred ÷ (SP − C)
                               = (N×CPP + N×RTO×RTO_cost) ÷ (SP − C)
                               (sheet: 7660 ÷ 361 = 21.22 → need ~22 delivered orders
                                to cover the ad + RTO bleed)
```

### Target CPP rule (the scale/kill gate)

From the BEC Target-CPP table (1000→80, 2000→160, 1599→127.92):

> **Target CPP = 8% of selling price.**

This is the **maximum acceptable cost-per-purchase**. It's the operational translation of the break-even ROAS in `docs/limits.md` (1.6×) into a per-order ad-cost ceiling.

- Actual CPP ≤ 8% of SP → **healthy, scale per `ad-scaling-rules`**
- Actual CPP 8-12% of SP → **marginal, hold + optimize creative**
- Actual CPP > 12% of SP → **kill the ad set** (per `ad-scaling-rules` kill thresholds; CPP is the India-friendly metric — easier to read than ROAS for COD-heavy stores)

Examples: SP ₹899 → target CPP ₹72. SP ₹1,299 → target CPP ₹104. SP ₹1,499 → target CPP ₹120.

### Hard economic gate for `product-research`

A product is **not GO** unless, at realistic FAD (default 0.70 for India COD) and CPP = 8% of SP:

```
NET PROFIT per total order  = FAD×(SP−C) − CPP − RTO×RTO_cost   >  0
```

If this is ≤ 0 at FAD 0.70, the product cannot scale profitably — score it HOLD/KILL in `winning-product-criteria` regardless of demand. Demand without unit economics is a money fire.

---

## 2. Product Arsenal tracking schema

Every existing AND new Shopify product must carry these fields. Where Shopify metafields make sense, `store-manager` stores them under namespace `arsenal`; the Notion Product Pipeline (managed by `ops-planner`) mirrors them as columns.

### Core tracking (Products sheet)

| Field | Metafield / Notion column | Notes |
|---|---|---|
| Product Name | (title) | — |
| Status | `arsenal.status` | Idea / Researching / Sourced / Testing / Tested / Live / Killed |
| Ads Status | `arsenal.ads_status` | Not started / Testing / Scaling / Paused / Killed |
| Comments | `arsenal.comments` | Free text — test learnings |
| FB Ad URL | `arsenal.fb_ad_url` | Meta Ads Library link to the winning competitor ad |
| Ad URL 2 | `arsenal.fb_ad_url_2` | Secondary reference ad |
| Competitor Website | `arsenal.competitor_url` | Their storefront (hand to `competitor-spy`) |
| Amazon URL | `arsenal.amazon_url` | Saturation + price-anchor check |
| AliExpress URL | `arsenal.ae_url` | Sourcing reference |
| Upsell | `arsenal.upsell` | The bump/cross-sell SKU paired at checkout |

### Unit economics (BEC sheet, per product)

| Field | Metafield / Notion column |
|---|---|
| Selling price | `arsenal.sp` (also Shopify price) |
| Product cost | `arsenal.cost` (also Shopify cost-per-item) |
| FAD (delivery rate) | `arsenal.fad` (default 0.70 until real data) |
| RTO rate | `arsenal.rto` (= 1 − FAD) |
| Target CPP | `arsenal.target_cpp` (= 0.08 × SP, computed) |
| Actual CPP | `arsenal.actual_cpp` (from Meta, updated by `marketing-analytics`) |
| Breakeven qty | `arsenal.breakeven_qty` (computed) |
| Net margin % | `arsenal.net_margin_pct` (computed) |

### Supplier tracking (Roposo sheet — generalises to any supplier)

| Field | Metafield / Notion column |
|---|---|
| Supplier | `arsenal.supplier` | Dropdash / Roposo / IndiaMART / AliExpress |
| Supplier cost | `arsenal.supplier_cost` |
| Supplier link | `arsenal.supplier_url` |
| Daily orders | `arsenal.daily_orders` |
| Delivery rate | `arsenal.delivery_rate` (= FAD, supplier-confirmed) |
| Tested (Y/N) | `arsenal.tested` |

---

## 3. Who uses this skill

- **`product-research`** — run the hard economic gate (§1) before any GO. Capture FB Ad URL, competitor, Amazon, AE URLs in the brief. A 32/35 winning-criteria score still fails if NET PROFIT per order ≤ 0 at FAD 0.70.
- **`ads-manager`** — Target CPP (8% of SP) is the per-ad-set kill/scale gate. Pull actual CPP daily; CPP > 12% of SP = kill (aligns with `ad-scaling-rules`).
- **`store-manager`** — write the `arsenal.*` metafields on every product create/enrich. Set Shopify cost-per-item from `arsenal.cost`.
- **`ops-planner`** — mirror the arsenal schema as columns in the Notion Product Pipeline DB so the workbook and Notion never drift. Keep `docs/product-arsenal/Ecom_Edge_Product_Arsenal.xlsx` as the offline source-of-truth the operator edits.
- **`marketing-analytics`** — update `arsenal.actual_cpp` and `arsenal.net_margin_pct` daily from live Meta + Shopify; flag any product whose actual CPP breaches Target CPP.
- **`inventory-planner`** — `arsenal.daily_orders` × lead time feeds the reorder math in `inventory-thresholds`.

---

## 4. Hard rules

- **Never approve a launch** without NET PROFIT per total order > 0 at FAD 0.70 and CPP = 8% of SP.
- **Never let an ad set run** with actual CPP > 12% of selling price for >2 days (kill it).
- **Always default FAD to 0.70** for a new India COD product until 50+ real delivered orders give a true rate; then use the real number.
- **Always compute Target CPP = 8% of SP** and store it on the product — it's the single number ads-manager checks.
- **RTO_cost default ₹72/RTO order** until courier invoices give the real figure; revise per supplier.
- The xlsx in `docs/product-arsenal/` is the operator's editable master. Agents READ the schema from this skill, WRITE values to metafields + Notion — they don't edit the xlsx.
