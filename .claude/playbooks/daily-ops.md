# Daily Ops Playbook

Run every morning, ~15 minutes operator time. Claude does the work; operator approves the moves.

## Trigger

- Calendar event "Daily Ops" 9:30 IST (created by `ops-planner`)
- Or operator says "run daily ops" / "morning routine"

## Sequence

### 1. Snapshot (marketing-analytics)
> "Pull the daily report — yesterday final + today-so-far + 7-day comparison. Flag anomalies."

Output: filled `DAILY REPORT` block (see `marketing-analytics` agent).

### 2. Reconcile Meta vs Shopify (marketing-analytics + pixel-doctor)
- Meta-reported revenue vs Shopify net revenue for yesterday
- If gap >40%, halt — pixel/CAPI is broken; **hand to `pixel-doctor` for diagnosis** before any ad changes today
- If gap is 20-40%, flag for tomorrow but proceed

### 3. Ads decisions (ads-manager)
> "Apply the scaling rules to all active ad sets using yesterday + 3-day + 7-day ROAS. Auto-execute the safe ones, propose the rest."

Output: decision table + executed actions + proposals awaiting approval.

### 4. Customer support (customer-support)
> "Triage the support inbox. Classify, look up orders, draft replies as drafts (not sent). Use templates from the `whatsapp-templates` skill."

Output: count by label, list of drafts for operator to approve and send.

### 4b. COD verification (cod-verification-daily playbook)
> "Run the COD verification routine for today's COD orders ≥₹999."

This is its own playbook — `cod-verification-daily.md` — and runs as a sub-routine here. Output: tier A/B/C counts, callbacks scheduled for operator, any auto-cancellations awaiting approval.

### 5. Order fulfillment (order-fulfillment)
> "Process new orders (COD-confirmed only). Send tracking emails for shipped. Chase NDR. Process approved refunds."

Output: counts + any orders flagged for operator review.

### 5b. Inventory health (inventory-planner)
> "Run the daily inventory check. Flag stockout-imminent SKUs, festival-window restocks, dead-stock candidates, and any Dropdash drift on tags/types."

Output: 5-bucket inventory report (healthy / reorder soon / stockout imminent / dead / Dropdash drift). Pipe stockout-imminent SKUs back into `ads-manager` for ad-set pause if any are still spending.

### 5c. Outbound email (email-marketer)
> "Draft today's abandoned cart touches (1/2/3), post-purchase NPS (+2d), review requests (+7d), and any win-back candidates hitting the 30/60/90-day milestone."

Output: count by flow + drafts awaiting operator approval.

### 6. Creative health check (creative-studio + ads-manager)
> "Any ads at frequency >2.5 with CTR drop >25%? Queue refresh briefs."

Output: list of ad sets needing refresh, briefs auto-drafted.

### 7. India-specific check-in (india-localizer)
> "Anything festival-window relevant in next 21 days? Any seasonal window closing? Any sale prep we should kick off today?"

Output: festival prep todos + seasonal urgency flags for `ops-planner`.

### 7b. Seasonal urgency check
For any product with a seasonal demand window (cooling fans, festival gifting, monsoon gear), state:
> "Cooling window: ~N days remaining before monsoon. Heating pad: evergreen. [product]: N days."

Flag immediately if a seasonal window is <7 days away and no campaign is live.

### 8. Ad account warmup check (performance-coach)
If the Meta ad account is in the 7-day warmup phase, include this block:

```
📈 WARMUP DAY N/7
Yesterday spend:  ₹X  (cap ₹1,000)
Purchase events:  N
EMQ:              N/10
Strikes:          N
Status: ON TRACK / DRIFT / HALT
```

### 9. Logging (ops-planner)
> "Log today's KPIs and decisions to the Notion 'Daily Standup Log' database."

### 10. Friday only — Performance Coach weekly review
> "Run the `performance-coach` weekly health score. Produce the 5-dimension score, 3 wins, 3 problems, and next week's priority list."

## Operator deliverable

By the end, the operator has:
- A 1-screen KPI snapshot
- Approved/rejected ads moves
- Approved/sent customer drafts
- Today's order pipeline status
- Seasonal urgency flags
- Warmup day status (if applicable)
- Tomorrow's prep queue

## Hard rule

If `marketing-analytics` reports any **high-severity anomaly** (pixel broken, RTO spike, store down, payment gateway issue), the playbook **stops** and escalates to operator before any ads or fulfillment actions.
