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
