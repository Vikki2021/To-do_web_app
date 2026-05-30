---
name: launch-ready
description: Pre-launch validation gate. Run this skill before activating any paid campaign. Produces a GREEN / YELLOW / RED verdict across 7 domains. All RED items must be fixed before launch. Used by ads-manager, ops-planner, and the operator at the end of the launch-product playbook.
---

# Launch-Ready Checklist

Run before every new product campaign goes live. One RED item = launch blocked.
One or more YELLOW items = launch with monitoring, fix within 24h.

---

## Domain 1 — Tracking (Pixel + CAPI)

| # | Check | How to verify | Pass |
|---|---|---|---|
| T1 | Meta Pixel installed and firing | `ads_get_dataset_quality` EMQ ≥ 6.0 | ✓/✗ |
| T2 | All 5 standard events fire | `ads_pixel_event_read` + manual store test | ✓/✗ |
| T3 | CAPI connected | Dataset stats show server-side events | ✓/✗ |
| T4 | Deduplication key (`event_id`) present | Check CAPI payload logs | ✓/✗ |
| T5 | COD `cod_confirmed` Purchase event | Fires on confirmation, NOT on order placement | ✓/✗ |
| T6 | Meta vs Shopify revenue gap <40% | 7-day reconciliation | ✓/✗ |

**RED if:** T1, T2, or T6 fail. **YELLOW if:** T3, T4, T5 fail.

---

## Domain 2 — Store / Checkout

| # | Check | How to verify | Pass |
|---|---|---|---|
| S1 | Live checkout test completed | Operator places test order on the exact product | ✓/✗ |
| S2 | Product page is ACTIVE (not draft) | `get-product` → status = ACTIVE | ✓/✗ |
| S3 | Price matches launch brief | Product price = brief sell price | ✓/✗ |
| S4 | Compare-at price set (shows discount) | compareAtPrice present, ≥ 1.3× sell price | ✓/✗ |
| S5 | COD badge visible on PDP | Visual check on mobile | ✓/✗ |
| S6 | "Free shipping" or shipping policy visible | Footer or product page | ✓/✗ |
| S7 | Return policy linked in footer | Settings → Policies | ✓/✗ |
| S8 | Contact info (WhatsApp/phone) visible | Header or footer | ✓/✗ |
| S9 | Product page mobile loads <3s on 3G | Chrome DevTools throttle test | ✓/✗ |

**RED if:** S1, S2, S3 fail. **YELLOW if:** S4–S9 fail (any).

---

## Domain 3 — Inventory

| # | Check | How to verify | Pass |
|---|---|---|---|
| I1 | Stock ≥ 50 units | `get-inventory-levels` | ✓/✗ |
| I2 | Days-of-stock ≥ 14 at projected launch velocity | inventory-planner check | ✓/✗ |
| I3 | Reorder placed if I2 is 14–21 days | Operator confirms Dropdash reorder | ✓/✗ |
| I4 | Seasonal window still open (if seasonal SKU) | india-localizer festival/season check | ✓/✗ |

**RED if:** I1 or I2 fails. **YELLOW if:** I3 or I4 needs attention.

---

## Domain 4 — Creative

| # | Check | How to verify | Pass |
|---|---|---|---|
| C1 | Creative brief complete (all fields per `creative-brief` skill) | Brief present in Notion or chat | ✓/✗ |
| C2 | At least 2 video variants ready | creative-studio confirms | ✓/✗ |
| C3 | At least 1 image ad variant ready | creative-studio confirms | ✓/✗ |
| C4 | Thumbnail set on every video ad | ads-manager pre-flight | ✓/✗ |
| C5 | No medical / health claims in any creative | Compliance check | ✓/✗ |
| C6 | No fake countdown timers / fake stock badges | Compliance check | ✓/✗ |
| C7 | Hinglish copy validated | india-localizer sign-off | ✓/✗ |
| C8 | Aspect ratios: 9:16 Reels/Story + 4:5 feed | creative-studio delivery | ✓/✗ |

**RED if:** C1, C5, or C6 fail. **YELLOW if:** C2, C3, C4, C7, C8 fail.

---

## Domain 5 — Campaign Structure

| # | Check | How to verify | Pass |
|---|---|---|---|
| A1 | Objective = Sales / Purchase conversion | Campaign settings | ✓/✗ |
| A2 | ABO at ₹200/ad set (testing phase) | Ad set budgets | ✓/✗ |
| A3 | Seven Sisters + J&K + Ladakh EXCLUDED | Ad set geo settings | ✓/✗ |
| A4 | High-RTO pincodes excluded | `cod_blocked_pincodes` applied | ✓/✗ |
| A5 | Campaign start time = 4:00 AM IST | Ad set schedule | ✓/✗ |
| A6 | Naming convention correct | `<Product> – <Price>` / `<Interest>` / `<1,2,3>` | ✓/✗ |
| A7 | UTM params on all landing URLs | `utm_source=fb&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}` | ✓/✗ |
| A8 | Automated kill rules attached | CPP > target+₹10 → pause | ✓/✗ |
| A9 | Ad account aged ≥7 days (or warmup completed) | `performance-coach` warmup tracker | ✓/✗ |

**RED if:** A1, A3, A9 fail. **YELLOW if:** A2, A4, A5, A6, A7, A8 fail.

---

## Domain 6 — Economics

| # | Check | How to verify | Pass |
|---|---|---|---|
| E1 | Landed cost confirmed (not placeholder = SP) | Operator confirmed real supplier cost | ✓/✗ |
| E2 | NET > 0 at FAD 0.70 + CPP = 8% SP + RTO 30% | `unit-economics` BEC gate | ✓/✗ |
| E3 | Target CPP calculated and in ad set kill rule | 8% of SP, buffer +₹10 | ✓/✗ |
| E4 | Break-even ROAS calculated | From `unit-economics` skill | ✓/✗ |

**RED if:** E1 or E2 fail. **YELLOW if:** E3 or E4 missing.

---

## Domain 7 — COD + Fulfillment Readiness

| # | Check | How to verify | Pass |
|---|---|---|---|
| F1 | COD verification email template ready | `whatsapp-templates` skill | ✓/✗ |
| F2 | Courier integrated with Shopify | `order-fulfillment` confirms | ✓/✗ |
| F3 | Tracking email template configured | `whatsapp-templates` skill | ✓/✗ |
| F4 | Abandoned cart Touch 1 live (or drafted) | `email-marketer` confirms | ✓/✗ |

**YELLOW if any fail.** (None are RED blockers but all cost money if missing.)

---

## Verdict Output

```
🚀 LAUNCH-READY VERDICT — <product> — <date>

DOMAIN SCORES
  Tracking:      ✅/⚠️/🚫  (<N>/6 pass)
  Store:         ✅/⚠️/🚫  (<N>/9 pass)
  Inventory:     ✅/⚠️/🚫  (<N>/4 pass)
  Creative:      ✅/⚠️/🚫  (<N>/8 pass)
  Campaign:      ✅/⚠️/🚫  (<N>/9 pass)
  Economics:     ✅/⚠️/🚫  (<N>/4 pass)
  Fulfillment:   ✅/⚠️/🚫  (<N>/4 pass)

OVERALL: 🟢 GREEN — Launch approved
       / 🟡 YELLOW — Launch with monitoring (fix <N> items within 24h)
       / 🔴 RED — Launch BLOCKED (fix RED items first)

RED BLOCKERS (must fix before any campaign goes live):
  - [domain] [item ID]: <description of what's missing and exact fix>

YELLOW ITEMS (fix within 24h of launch):
  - [domain] [item ID]: <description>

ESTIMATED TIME TO FIX: <N hours>
```

---

## Usage by agents

- **`ops-planner`** — run this at the end of `launch-product.md` playbook. Do not mark a product "LIVE" in Notion until GREEN or YELLOW verdict.
- **`ads-manager`** — run this before calling `ads_activate_entity` on a new campaign. If RED, refuse to activate and return the blocker list.
- **Operator** — "is [product] launch-ready?" triggers this skill via any agent.
