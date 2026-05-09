# COD Verification Daily Playbook

For Indian dropshipping, RTO is the silent margin killer (baseline 25-35%). The single highest-leverage thing the operator can do is verify every COD order >₹999 before dispatch. This playbook runs every morning to do that systematically.

## Trigger

- Calendar event "COD Verify" 10:00 IST (created by `ops-planner` after first run)
- Or operator says "confirm COD orders" / "verify COD"
- Or `daily-ops` invokes this between Step 4 (customer-support) and Step 5 (order-fulfillment)

## Sequence

### 1. Pull COD orders awaiting verification (order-fulfillment)
> "Pull all orders since the last run with payment_gateway = COD and tag != cod_confirmed."

Output: list of `order_num`, `customer_name`, `phone`, `email`, `amount`, `placed_at`, `pincode`.

### 2. Tier the orders by amount
- **Tier A** (≥₹1,500): mandatory phone call. Email is insufficient.
- **Tier B** (₹1,000-₹1,499): WhatsApp + email. Phone fallback if no response in 6h.
- **Tier C** (≤₹999): email only. Auto-dispatch if no negative response in 24h.

### 3. Check pincode + phone blocklists (india-localizer)
Cross-reference each order against `docs/limits.md → cod_blocked_pincodes` and `cod_blocked_phones`. Auto-cancel any order that matches and email the customer with the standard cancellation template.

### 4. Send confirmation messages (customer-support + email-marketer)
Use the COD Confirmation template from `whatsapp-templates` skill. Hinglish for tier-2/3 by pincode lookup; English for metro pincodes.

For Tier A: schedule a phone callback on Calendar (operator's responsibility), or assign to support staff if available.

### 5. Wait window (4-24h)
The playbook splits into two passes: morning send, afternoon scan for replies. Operator approves any cancellations.

### 6. Process responses
- **YES / confirmed**: tag order `cod_confirmed`, hand to `order-fulfillment` for dispatch
- **CANCEL / no response after 24h**: tag `cod_cancelled`, send cancellation email, no dispatch
- **Question or other reply**: hand thread to `customer-support` to triage

### 7. Update RTO blocklists (india-localizer + ops-planner)
After each cancellation:
- If a phone has 2+ COD cancellations or RTOs in the last 90 days → add to `cod_blocked_phones` (per `indian-dropshipping` skill)
- If a pincode has ≥3 RTOs in the last 90 days → add to `cod_blocked_pincodes`

### 8. Log to Notion (ops-planner)
Append to "Daily Standup Log":
- Date, COD orders received, confirmed, cancelled, awaiting
- Any new pincode/phone blocklist additions
- RTO trend signal (this week's confirmed-to-cancelled ratio vs last week's)

## Operator deliverable

By end of run:
- Tier A orders → operator has a callback list with names + numbers
- Tier B + C → automated drafts/sends, operator approves the few that need attention
- Cancelled orders → refund processed if any prepaid component, customer emailed

## Hard rules (per `indian-dropshipping` skill)

- **Never dispatch a COD order >₹999 without confirmation**
- **Never auto-blacklist a pincode/phone without 2+ data points** — single RTOs happen for many reasons
- **Never call customers outside 9 AM - 8 PM IST** — looks unprofessional and may breach DND norms
- **Never dispatch on a Sunday** for tier-2/3 pincodes — courier handoff slips and customer availability drops; queue Sunday-placed orders for Monday morning
- **Bulk send cap**: ≤20 confirmation messages per minute (avoid carrier spam-flag)
- **Operator must approve** any auto-cancellation list >5 orders per run

## Festival-window adjustments

During Diwali / Raksha Bandhan / Independence Day windows (T-7 to T-0):
- COD verification SLA tightens: auto-cancel after **12h** of silence instead of 24h (because sale-window timing matters)
- Tier C threshold lowers to **≤₹699** (anything above gets WhatsApp/email confirmation)
- Phone confirmations expand to all Tier B as well (not just A)

## Why this is its own playbook

`daily-ops` already references COD verification (Step 4-5) but at a high level. This playbook is the concrete day-by-day workflow. Run as a sub-routine OR standalone. It's the single highest-impact operational lever for an Indian dropshipping store on COD-heavy traffic.
