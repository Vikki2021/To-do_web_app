---
name: inventory-thresholds
description: Concrete rules for reorder timing, festival stock multipliers, dead-stock identification, low-stock display thresholds, and inventory display caps. Used by inventory-planner every daily run — never decide by feel.
---

# Inventory Thresholds

All numbers below are tuned for an Indian dropshipping store on a Dropdash supply chain (3-7 day domestic restock, 10-20 day overseas restock). Replace `LEAD_DAYS` with the SKU's actual restock lead time when computing.

## 1. Reorder point (RoP)

```
RoP_units = velocity_per_day × (LEAD_DAYS + safety_days)
safety_days = 3 (default)  | 7 (for top-3 SKU by revenue)  | 14 (during festival window T-21 to T-7)
```

When current inventory drops to RoP, **flag for reorder**.

| SKU class | LEAD_DAYS | safety_days | Effective trigger |
|---|---|---|---|
| IndiaMART (domestic) | 5 | 3 | velocity × 8 days of stock |
| Dropdash partner-stocked | 4 | 3 | velocity × 7 days of stock |
| AliExpress agent | 17 | 3 | velocity × 20 days of stock |
| Local manufacturer | 10 | 3 | velocity × 13 days of stock |

Use the SKU's recorded supplier route (Notion Product Pipeline → Notes URL or supplier metafield).

## 2. Festival stock multipliers

Apply these BEFORE computing RoP during the festival window. Multiplier applies to forecast velocity, not current velocity.

| Festival | Window applies | Multiplier | Pillar product types affected |
|---|---|---|---|
| Diwali (PEAK) | T-21 to T-3 | **3.0×** | Everything; especially gifting, decor, electronics |
| Raksha Bandhan | T-14 to T-3 | 2.0× | Gifting, accessories, beauty |
| Independence Day | T-7 to T-0 | 1.4× | Broad |
| Hariyali Teej / Karwa Chauth | T-14 to T-3 | 2.2× | Apparel, gifting (regional N) |
| Onam | T-14 to T-3 | 2.2× | Regional S |
| Christmas + NYE | T-14 to T-3 | 1.8× | Gifting, gadgets |
| Mother's Day | T-7 to T-0 | 1.5× | Gifting, beauty |
| Bhai Dooj | T-7 to T-0 | 1.6× | Gifting |
| Valentine's | T-14 to T-0 | 1.6× | Gifting, accessories |

For SKUs **not in the affected pillar** for a given festival, no multiplier is applied — but flag them anyway because spillover demand happens.

**Pitru Paksha** (Sep, ~16 days, varies by year) — apply a **0.7× multiplier** for celebratory products (per the `indian-dropshipping` skill). Don't reorder during this window unless RoP is breached on its own.

## 3. Stockout severity bands

| Days of stock remaining | Severity | Action |
|---|---|---|
| ≥14 days | 🟢 Healthy | None |
| 8-13 days | 🟡 Reorder soon | inventory-planner flags; ops-planner schedules reorder |
| 4-7 days | 🟠 Reorder now | Operator alert; consider pausing scaling on this SKU |
| 1-3 days | 🔴 Stockout imminent | ads-manager pauses ad sets for this SKU; emergency reorder if possible |
| 0 days (out) | 🚫 Archive product | Set product status to `archived` (not 0 inventory) to avoid Meta algorithm punishment; flag for reactivation when restocked |

## 4. Dead-stock identification

A SKU is **dead stock** if all true:
- 0 sales in last **30 days**
- Inventory > **20 units** (cost-of-capital threshold)
- Not currently in a planned festival window (a SKU might be intentionally held for an upcoming push)

Action options for dead stock (operator decides):
- **Clearance discount**: 30-40% off via `ops-planner` discount creation, push for 14 days
- **Bundle**: pair with an active SKU, push as a duo
- **Supplier return**: if supplier accepts (Dropdash sometimes does)
- **Retire**: archive product, write killed-product post-mortem

## 5. Display rules (storefront-side)

| Inventory level | Display behaviour |
|---|---|
| ≥50 units | Standard "In stock" badge |
| 11-49 units | "In stock" + delivery ETA shown |
| 5-10 units | Show "Only X left" — but **only if X is real**, never fake urgency |
| 1-4 units | Show "Only X left", elevate ad-set frequency cap to milk last sales |
| 0 units | Product set to `archived`; not displayed |

**Never display inventory above 200** as a hard cap on storefront — caps are visual ("In stock"), not numeric. Numeric inventory >200 in Shopify is fine for backend but should not be exposed to buyers.

## 6. Inventory cap on Shopify backend

Set realistic numeric inventory in Shopify too. Range: **50-200 units** for normal SKUs. Anything outside this range looks fabricated:
- Below 50 — looks like stockout coming, may suppress purchase
- Above 200 — looks fake; the audit caught Vacuum Cleaner at 1,799 (clearly fabricated)

Exception: during festival prep, set to whatever the festival multiplier requires (could legitimately be 500+ for a Diwali peak).

## 7. Dropdash sync drift detection

Per `inventory-planner`'s daily check:
- For each Dropdash-vendored SKU, compare `updatedAt` against the timestamp of our last metafield/tag write (logged in Notion Daily Standup Log if available, else last commit on the harness)
- If `updatedAt > our_last_write` AND `tags` contain `DropDash.Entity.Shopify.TagsViewModel` → drift confirmed, store-manager re-applies

## 8. Auto-execute boundary

`inventory-planner` may execute automatically:
- Flag stockout, reorder-soon, dead-stock to operator
- Compute reorder quantities and dates per skill
- Log inventory snapshots to Notion

`inventory-planner` must **propose and wait** for operator approval:
- Archiving a SKU (even if dead-stock)
- Bulk inventory adjustments >5 SKUs at once
- Discount code creation for clearance
- Supplier-return requests
