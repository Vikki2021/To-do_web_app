---
name: whatsapp-templates
description: Pre-approved WhatsApp Business and email templates for every customer-facing intent — COD confirmation, NDR follow-up, refund, abandoned cart, post-purchase NPS, win-back, festival broadcasts. Hinglish + English variants. Used by customer-support, order-fulfillment, and email-marketer to keep voice consistent.
---

# WhatsApp & Email Templates

Every outbound message uses one of these templates as a starting point. Adapt for context (customer name, order number, product) but **do not** rewrite the structure — consistency builds trust over time.

Two language variants per template: **Hinglish** for tier-2/3 audiences and customers who wrote in Hinglish; **English** for metro audiences and customers who wrote in English. Match the customer's language unless they're a brand-new contact (default Hinglish for COD confirmations, English for prepaid).

Variables: `{name}` `{order_num}` `{product}` `{amount}` `{tracking_url}` `{eta}` `{courier}` `{awb}`.

---

## 1. COD Confirmation (proactive, all COD orders >₹999)

**Hinglish (default for COD)**
> Hi {name}, EcomBudgetStore se. Aapne {product} ka order #{order_num} ₹{amount} mein COD pe diya hai. Confirm karne ke liye **YES** reply karein, ya **CANCEL** karne ke liye CANCEL bhejein. Confirm hone par 24 ghante mein dispatch ho jayega.

**English**
> Hi {name}, this is EcomBudgetStore. We're confirming your COD order #{order_num} for {product} at ₹{amount}. Reply **YES** to confirm or **CANCEL** to drop. We dispatch within 24 hours of confirmation.

Single-message intent: confirmation. **Don't ask any other question.** If customer asks something else, hand to `customer-support`.

---

## 2. Order Status (responding to "where is my order")

**Hinglish**
> Hi {name}, aapka order #{order_num} ({product}) {courier} ke through ship ho gaya hai (AWB {awb}). Expected delivery: {eta}. Track here: {tracking_url}. Aur kuch ho to reply karein.

**English**
> Hi {name}, your order #{order_num} for {product} shipped via {courier} (AWB {awb}). Expected delivery: {eta}. Track: {tracking_url}. Anything else, just reply.

---

## 3. Tracking Email (transactional, sent on dispatch)

Subject: `Your order #{order_num} is on the way 🚚`

> Hi {name},
>
> Your order with {product} shipped today.
>
> Courier: {courier}  |  AWB: {awb}
> Expected delivery: {eta}
> Track: {tracking_url}
>
> Reply to this email if you need anything.
>
> — EcomBudgetStore

---

## 4. NDR Follow-up (Out for Delivery + 1 attempt failed)

**Hinglish**
> Hi {name}, aapka order #{order_num} aaj deliver nahi ho saka. Kal courier dobara try karega. Agar address ya availability mein change ho to reply karein, hum courier ko inform karenge.

**English**
> Hi {name}, your order #{order_num} couldn't be delivered today. Courier will retry tomorrow. If your address or availability has changed, reply here so we can update the courier.

---

## 5. RTO Recovery (in-transit return started)

**Hinglish**
> Hi {name}, aapka order #{order_num} hum tak wapas aa raha hai. Agar still chahiye, hum 50% off pe re-ship kar sakte hain. **YES** reply karein recovery offer ke liye, ya **REFUND** for full refund.

**English**
> Hi {name}, your order #{order_num} is being returned to us. If you'd still like it, we can re-ship at 50% off. Reply **YES** to claim the offer, or **REFUND** for a full refund.

Recovery offer max once per customer per SKU.

---

## 6. Refund (damaged item)

**Hinglish**
> Sorry sunke bura laga, {name}. Kya aap damaged item ki photo bhej sakte hain? Photo milte hi hum 24 ghante mein full refund ya replacement initiate karenge — jo aap chahein. Order #{order_num}.

**English**
> Sorry to hear that, {name}. Could you share a photo of the damaged item? Once we have it, we'll initiate a full refund or replacement (your choice) within 24 hours. Order #{order_num}.

---

## 7. Cancellation (pre-ship)

**Hinglish**
> Done, {name}. Order #{order_num} cancel ho gaya. Prepaid orders ka refund 5-7 business days mein source pe wapas aa jayega.

**English**
> Done, {name}. Order #{order_num} is cancelled. Prepaid orders refund to source within 5-7 business days.

---

## 8. Abandoned Cart — Touch 1 (+2h)

Subject: `Forgot something? 🛒`

**Hinglish**
> Hi {name}, aapne {product} cart mein chhod diya. Stock kam hai — pura karna hai? Cart yaad rakha hai: {cart_url}.

**English**
> Hi {name}, you left {product} in your cart. We saved it for you: {cart_url}.

---

## 9. Abandoned Cart — Touch 2 (+24h, with ₹100 incentive)

Subject: `₹100 off, just for you`

**Hinglish**
> Hi {name}, aapke {product} ke liye ₹100 off lagaya — code: **CART100** (48 ghante valid). Cart wapas dekhne ka link: {cart_url}.

**English**
> Hi {name}, here's ₹100 off your {product} — code **CART100** (valid 48h). Pick up where you left off: {cart_url}.

---

## 10. Abandoned Cart — Touch 3 (+72h, last touch)

Subject: `Saving your cart for one more day`

**Hinglish**
> Hi {name}, aapka cart 3 din se wait kar raha hai. Aaj last day. {cart_url}.

**English**
> Hi {name}, your cart has been waiting 3 days. Today's the last day we hold it for you. {cart_url}.

After this — no more touches. Drop the contact.

---

## 11. Post-Purchase NPS (+2 days post-delivery)

Subject: `How's {product} treating you?`

**Hinglish**
> Hi {name}, {product} mil gaya? Reply karein 1-10 rating. Agar 9-10 hai, ek quick review yahaan likh dein: {review_url}. Thanks ke liye ₹100 off next order pe.

**English**
> Hi {name}, did {product} arrive in good shape? Reply 1-10. If it's a 9 or 10, we'd love a quick review here: {review_url}. ₹100 off your next order as thanks.

---

## 12. Review Request (+7 days post-delivery)

Subject: `Photo review = ₹100 off your next order`

**Hinglish**
> Hi {name}, {product} kaisa raha? Ek quick photo review chahiye — ₹100 off next order pe milega. Yahaan upload karein: {review_url}.

**English**
> Hi {name}, how's {product} working out? A quick photo review earns you ₹100 off your next order. Upload here: {review_url}.

---

## 13. Win-Back / Lapsed Buyer (90+ days, was >₹999 buyer)

Subject: `We miss you, {name}`

**Hinglish**
> Hi {name}, aapko {product_category} mein interest tha — naye items aaye hain. 15% off ke saath wapas aaiye, code **WELCOME_BACK_15** (14 din valid).

**English**
> Hi {name}, you'd shown interest in {product_category} — we have new arrivals. Welcome back with 15% off, code **WELCOME_BACK_15** (valid 14 days).

---

## 14. Festival Broadcast — Past Buyers (T-7)

Subject (Diwali example): `Diwali ki shopping shuru — exclusive 20% off for you`

**Hinglish**
> Hi {name}, Diwali aa rahi hai aur aap hamare valued customer hain — 20% off ka exclusive code aapke liye: **DIWALI20**. Aaj se T-7 din valid. {sale_url}.

**English**
> Hi {name}, Diwali is approaching and you're one of our valued customers — here's an exclusive 20% off code: **DIWALI20**. Valid through T-0. {sale_url}.

---

## Hard rules (apply to every send)

- **Match the customer's language** if they wrote previously. New contacts: Hinglish for COD-eligible orders, English for prepaid metro signups.
- **Single-intent per message** — don't bundle a tracking update with a review request. Two intents = two messages.
- **GST-inclusive prices** in any rupee mention. Never quote pre-tax.
- **No medical claims** — never reference health benefits, cures, or "fixes" anywhere.
- **No fake urgency** — "stock kam hai" is OK only if inventory is genuinely <50 units.
- **No ALL CAPS** subjects or excessive emojis — looks like spam to inbox filters.
- **Always include unsubscribe** in marketing emails (transactional emails — tracking, COD confirmations, refund — are exempt).
- **WhatsApp Business templates need pre-approval** — for proactive WhatsApp sends, the template must be approved by Meta first. Operator manages approvals.

## Discount code reference

These codes appear in templates above. Check `docs/limits.md` for max values:

| Code | Discount | Single-use | Expiry |
|---|---|---|---|
| `WELCOME10` | 10% off first order | Yes | 30d |
| `COD50` | ₹50 off | Yes | 30d |
| `CART100` | ₹100 off cart-recovery | Yes | 48h |
| `WELCOME_BACK_15` | 15% off win-back | Yes | 14d |
| `DIWALI20` (festival-specific) | 20% off | Yes | T-0 |

Festival-specific codes are created by `ops-planner` ahead of each window per the `festival-sale` playbook.
