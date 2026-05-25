# Ad Account Warmup Playbook

For new Meta ad accounts — fresh business manager, freshly verified Pixel, or after an account reinstatement. Skip this and you get throttled or banned within 2 weeks.

## Trigger

- Brand-new Meta Business Manager / ad account
- Account reinstated after a policy strike
- Operator says "warm up the account" / "new ad account"
- Pixel just verified for the first time (per `pixel-doctor` install SOP)

## Why this matters

Meta runs every new ad account on a trust gradient. Demand ₹1 lakh/day on Day 1 → flag → review queue → throttle or ban. Spend ₹1,000/day for a week first → trust builds → spend cap auto-raises. The account behaves like a new employee: prove yourself before demanding scope.

## Day 0 — Pre-warmup checklist

Owned by `pixel-doctor` + operator:

- [ ] Business Manager set up (not personal account)
- [ ] Aged FB profile used (3+ years old) as admin — never a fresh profile
- [ ] Pixel installed via Shopify Facebook & Instagram channel (see `pixel-doctor` 8-step SOP)
- [ ] Pixel firing verified via Meta Pixel Helper Chrome extension
- [ ] CAPI connected (default with Shopify F&I channel)
- [ ] Payment method: UPI/debit card to start (upgrade to credit card after trust builds)
- [ ] Billing threshold accepted at default (₹500) — Meta auto-raises
- [ ] Timezone = India · Currency = INR · Business category accurate
- [ ] FB Page + Instagram account connected
- [ ] Ad account NOT shared with untrustworthy parties (single flag can kill the entire account)

## Days 1-7 — The warmup itself

Owned by `ads-manager` + operator.

### Spend ceiling

- **Day 1**: ₹500-1,000 total across the account. Not more.
- **Days 2-7**: hold ₹1,000/day steady. This is Meta's default trust ceiling for new accounts.
- **Never** jump >20-30% in a single day during warmup — triggers review.
- Consistency matters more than amount: ₹200/day every day beats ₹0 / ₹5,000 / ₹0.

### Campaign structure during warmup

Run the operator's standard testing protocol per `ad-scaling-rules`, but at the warmup-spend cap:
- 1 Sales campaign, 5 ad sets (NOT the full Day-2 expansion to 10)
- ABO at ₹200/day per ad set
- Single interest per ad set, broad placements
- Naming convention enforced (`<Product> – <Price>` etc.)
- 4 AM IST start time

This gives a clean signal without exceeding the trust cap.

### Do NOT during warmup

- ❌ Edit live campaigns in the first 48 hours (let learning phase run)
- ❌ Pause and relaunch multiple times (looks like manipulation)
- ❌ Use a VPN to access the ad account (instant red flag)
- ❌ Multiple payment-method changes
- ❌ Sudden spend spikes (a ₹500 → ₹5,000 jump = review trigger)
- ❌ Run any policy-borderline creatives (health claims, before/after body, fake scarcity) — the account's first impression with Meta's review system

### Day 7 — Graduation check

The account is "warmed up" when:
- 7 consecutive days of consistent spend
- At least 1 ad set has produced ≥5 purchases (signal the Pixel is healthy)
- No policy strikes
- No payment failures
- Meta's daily-spend-limit warning has either lifted or auto-raised
- EMQ ≥ 6.0 (per `pixel-doctor` dataset quality)

If all green → graduate to the standard `launch-product` Stage 5 testing protocol (full 5+5 ABO at ₹200/ad set, up to ₹2,000/day Day 2).

If any red → hold at warmup spend for another 3-5 days, diagnose with `pixel-doctor` and `ads-manager`.

## Weeks 2-3 — Post-warmup scaling discipline

- Increase by max 20-30% per day during scaling (per `ad-scaling-rules` Phase 2)
- Never 10x budget in a single jump — max 2x at a time
- The account's spend limit auto-raises as Meta trusts you more — don't fight it, ride it

## Hard rules

- **Never** demand ₹1 lakh/day spend on a Day-1 account. Build trust first.
- **Never** use a fresh FB profile as the admin — 3+ year aged account only.
- **Never** share ad account access with parties outside the team — one bad flag kills the account.
- **Never** run a policy-borderline creative during warmup — first impression matters disproportionately.
- If the account gets a policy strike during warmup, **pause everything immediately** and have `pixel-doctor` + operator review before resuming.

## Handoff

- Pixel issues during warmup → `pixel-doctor`
- Day 7 graduation passes → `launch-product` Stage 5
- Policy strike → operator + `ads-manager`; pause first, appeal second
