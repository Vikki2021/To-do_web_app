# Daily Ops Playbook

Run every morning, ~15 minutes operator time. Claude does the work; operator approves the moves.

## Trigger

- Calendar event "Daily Ops" 9:30 IST (created by `ops-planner`)
- Or operator says "run daily ops" / "morning routine"

## Sequence

### 1. Snapshot (marketing-analytics)
> "Pull the daily report — yesterday final + today-so-far + 7-day comparison. Flag anomalies."

Output: filled `DAILY REPORT` block (see `marketing-analytics` agent).

### 2. Reconcile Meta vs Shopify (marketing-analytics)
- Meta-reported revenue vs Shopify net revenue for yesterday
- If gap >40%, halt — pixel/CAPI is broken; do not change ad budgets today

### 3. Ads decisions (ads-manager)
> "Apply the scaling rules to all active ad sets using yesterday + 3-day + 7-day ROAS. Auto-execute the safe ones, propose the rest."

Output: decision table + executed actions + proposals awaiting approval.

### 4. Customer support (customer-support)
> "Triage the support inbox. Classify, look up orders, draft replies as drafts (not sent)."

Output: count by label, list of drafts for operator to approve and send.

### 5. Order fulfillment (order-fulfillment)
> "Process new orders. COD verification email for unconfirmed. Send tracking emails for shipped. Chase NDR. Process approved refunds."

Output: counts + any orders flagged for operator review.

### 6. Creative health check (creative-studio + ads-manager)
> "Any ads at frequency >2.5 with CTR drop >25%? Queue refresh briefs."

Output: list of ad sets needing refresh, briefs auto-drafted.

### 7. India-specific check-in (india-localizer)
> "Anything festival-window relevant in next 14 days? Any sale prep we should kick off today?"

Output: festival prep todos for `ops-planner`.

### 8. Logging (ops-planner)
> "Log today's KPIs and decisions to the Notion 'Daily Standup Log' database."

## Operator deliverable

By the end, the operator has:
- A 1-screen KPI snapshot
- Approved/rejected ads moves
- Approved/sent customer drafts
- Today's order pipeline status
- Tomorrow's prep queue

## Hard rule

If `marketing-analytics` reports any **high-severity anomaly** (pixel broken, RTO spike, store down, payment gateway issue), the playbook **stops** and escalates to operator before any ads or fulfillment actions.
