# Operational Limits & Caps

Hard limits the agents must respect. Edit this file to change them — agents read it as source of truth.

## Ad spend caps

| Scope | Daily cap | Notes |
|---|---|---|
| Total Meta Ads daily spend | ₹50,000 | Halt new ad sets if today's spend would push past this |
| Single ad set | ₹15,000 | At this point, switch to scaling-campaign duplication |
| Single campaign | ₹30,000 | Beyond this, plan Advantage+ Shopping rollout |
| New product launch (week 1) | ₹3,000/day | Test phase only |

## Discount caps

| Code type | Max value | Required |
|---|---|---|
| First-order code | 15% | Single use per customer, expiry ≤30 days |
| Cart-recovery | ₹200 flat | Single use, expiry ≤7 days |
| Festival sale | 30% | Operator approval, expiry locked to festival window |
| Influencer / partner | Custom | Operator approval mandatory |

## Customer support

| Action | Cap | Beyond cap |
|---|---|---|
| Bulk reply | 20 threads in one batch | Operator approval |
| Compensation coupon issued without ticket | ₹0 | Always need a ticket reason |
| Refund issued without operator | ≤ ₹500 | Above ₹500 needs approval |

## Outbound email & WhatsApp (email-marketer)

| Action | Cap | Beyond cap |
|---|---|---|
| Abandoned cart drafts in one run | ≤50 drafts | Operator review on send |
| Marketing email send (manual approve) | ≤20 recipients auto-OK | >20 needs operator approval |
| Festival broadcast (any size) | — | Always operator-approved |
| Sample-then-full broadcast threshold | ≥100 recipients | Send 10% sample first, wait 30 min, check open/complaint rates |
| WhatsApp Business proactive sends | Pre-approved templates only | Operator manages template approvals in Meta |
| Win-back / lapsed-buyer sequence | ≤200 recipients/day | Above needs approval + warm-up plan |

### Email blocked contacts (purge before sending)

The customer list audit found bot-contaminated entries. These domains/patterns must be excluded from every send:
- `*@grammarly.com`
- `*@supermetrics.com`
- `*@flipkart.com`
- `*@codecademy.com`
- `*@galaxy.ai`

Add new patterns here as discovered. `email-marketer` reads this list before every send.

## Inventory (inventory-planner)

| Setting | Value |
|---|---|
| Numeric inventory normal range | 50-200 units per active SKU |
| Festival peak ceiling | 500-1,000 units (Diwali only, T-21 onward) |
| Display "Only X left" threshold | 1-10 units (must be real, not fake urgency) |
| Display "In stock" + ETA threshold | 11-49 units |
| Default sales-velocity window | 30-day rolling |
| Festival-window safety stock | 14 days (vs 3-day default) |
| Top-3-by-revenue safety stock | 7 days (vs 3-day default) |
| Dead stock threshold | 0 sales 30d + >20 units |

Stockout severity → action: see `.claude/skills/inventory-thresholds/SKILL.md`. Reorder formulas and festival multipliers live there.

## Fulfillment

| Action | Cap |
|---|---|
| Bulk order action | 50 orders per batch — beyond requires approval |
| Single refund | ≤ order total, never above |
| Re-shipment offer | 50% off, max once per customer per SKU |

## Banned categories (never list / never advertise)

- Health/medical claims (cures, treatments, supplements with claims)
- Branded items without official authorization
- Items requiring licenses we don't hold (FSSAI, CDSCO, BIS where mandatory)
- Restricted Meta categories (weapons, surveillance, drugs)
- IP-infringing merchandise (Bollywood, sports, character licenses)

## COD blocklists (build over time — agents append)

### Blocked pincodes (high RTO)
<!-- format: <pincode> — <reason> — <date added> -->
<!-- example: 110001 — 3 RTOs in 14 days — 2026-04-12 -->

### Blocked phones
<!-- format: <hashed phone or last4> — <reason> — <date added> -->

## Cash buffer

- Maintain ≥ 30-day operating buffer before any scale move
- Tax provision: 10% of net profit + 18% GST collected
- Supplier payments: only from prepaid receipts, never from COD float

## Approval requirements (cross-cutting)

The agents auto-execute below the cap and propose-then-wait above it. Don't change these without updating both `ads-manager` and `customer-support` agent files in lockstep.

| Trigger | Auto OK | Needs approval |
|---|---|---|
| Single budget change | ≤20% | >20% |
| Pause batch | ≤5 entities | >5 |
| Bulk customer email | ≤20 recipients | >20 |
| New campaign launch | none | always |
| Mass product update | ≤10 products | >10 |
| Refund per customer | ≤₹500 | >₹500 |
| Inventory bulk adjust | ≤5 SKUs | >5 |
| Archive a SKU (dead-stock retire) | none | always |
| Festival broadcast | none | always |
| Auto-cancel COD batch (cod-verification-daily) | ≤5 orders/run | >5 |
| Pincode/phone blocklist add | 1 per run | >1 |
