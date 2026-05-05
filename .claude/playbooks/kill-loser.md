# Kill Loser Playbook

For products / ad sets / creatives that breach `ad-scaling-rules` kill thresholds.
Goal: stop the bleed, learn the lesson, free capital for the next winner.

## Trigger

- `ads-manager` flags ROAS < BE × 0.5 over 3 days
- Or no-purchase ad set spent ≥ 2× target CPA
- Or operator says "kill <product>"

## Step 1 — Pause first, diagnose second (ads-manager)

- Pause all losing ad sets immediately (operator approval required if account daily spend ≥ ₹2,000/day)
- Don't pause the entire campaign yet — keep the structure for diagnosis

## Step 2 — Diagnose (marketing-analytics + ads-manager)

Run the diagnostic tree:

1. **Pixel/CAPI healthy?** → If no, the ROAS data is unreliable; fix tracking and re-evaluate.
2. **Funnel issue?** Look at LP CVR, ATC rate, IC→Purchase rate. If CVR < 1%, problem is the page, not the ads.
3. **Creative issue?** Top ad CTR < 0.8%? hooks not landing.
4. **Audience issue?** CPM > 2× benchmark? targeting wrong people or auction crowded.
5. **Offer issue?** Comparable products on Amazon for less? buyers price-checked.
6. **Product-market fit?** Even with great ad metrics, no purchase = product is wrong.

## Step 3 — Decide (operator)

- **Refresh** — diagnosis is creative or audience: hand back to `creative-studio` / `ads-manager` for one more cycle
- **Reposition** — diagnosis is offer / page: hand to `store-manager` to rebuild LP / bundle / pricing
- **Kill** — diagnosis is product-market fit: stop spending, archive product

## Step 4 — Execute kill (if killed)

`ads-manager`:
- Pause all related campaigns
- Archive (don't delete) campaigns for historical reference

`store-manager`:
- Set product status to `archived` (not deleted — keeps order history)
- Remove from active collections
- Pull discount codes specific to this SKU

`customer-support`:
- Anyone mid-conversation about this product → finish the conversation gracefully
- No new "buy this" emails

`order-fulfillment`:
- Existing paid/COD-confirmed orders ship as normal
- Cancel + refund any unconfirmed COD older than 24h

`product-research`:
- Move Notion "Product Pipeline" entry to "Killed" view
- Write a 5-line post-mortem: what we expected, what happened, why, lesson for next launch

## Step 5 — Capital reallocation (operator + ads-manager)

- Free budget moves to next-priority winner per `marketing-analytics` weekly review
- Or holds in reserve if no clear winner waiting

## Step 6 — Refund cleanup (order-fulfillment + customer-support)

- Process refunds for any cancelled prepaid orders within 24h
- Inform any in-transit RTO orders that re-shipment offer is off the table; refund on RTO arrival

## Hard rules

- Never delete the Shopify product — archive only (preserves order history, reviews, SEO juice).
- Never leave killed campaigns running on weekends "to be safe" — pause completes when Claude says it's done.
- Always write the post-mortem. The next launch is paid for by lessons from this one.
- Don't re-launch a killed product within 60 days unless the post-mortem identifies a fixable, non-product cause.
