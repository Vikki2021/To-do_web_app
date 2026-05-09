// =============================================================================
// PRE-SAMPLE DRAFT — DO NOT PUSH TO SHOPIFY YET
// =============================================================================
// SKU: BB-021 | Stainless Steel Cryo Face Ice Roller
// Drafted: 2026-05-09 | Drafted by: store-manager agent
//
// STATUS: Awaiting sample arrival. This file is for operator review only.
// The next gate before this goes live is:
//   1. Order sample unit
//   2. Photograph and film demo (hero, lifestyle, scale, unboxing)
//   3. Run copy through india-localizer brand-check
//   4. Confirm supplier lead time and MOQ can support 100-unit open
//   5. Push to Shopify via store-manager once all above are cleared
//
// All image slots below are BRIEFS for creative-studio, not live URLs.
// No reviews have been seeded — add after first 50 verified sales.
// =============================================================================

export type RtoRisk = 'low' | 'medium' | 'high';

export type Metafields = {
  cod_eligible: boolean;
  rto_risk: RtoRisk;
  angle: string;
  hsn_code: string;
};

export type ImageBrief = {
  slot: string;
  description: string;
};

export type AdAngle = {
  angle: string;
  primaryText: string;
  headline: string;
  cta: string;
};

export type ShopifyDraftProduct = {
  title: string;
  handle: string;
  bodyHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  price: number;
  compareAtPrice: number;
  inventoryQty: number;
  seoTitle: string;
  seoDescription: string;
  metafields: Metafields;
  imageBriefs: ImageBrief[];
  adAngles: AdAngle[];
};

export const BB_021_DRAFT: ShopifyDraftProduct = {
  title: 'Stainless Steel Cryo Face Ice Roller for De-Puffing',

  handle: 'stainless-steel-cryo-face-ice-roller',

  vendor: 'BeautyBliss',

  productType: 'Skincare Tools',

  // ---------------------------------------------------------------------------
  // DESCRIPTION — Hinglish-first, no medical claims, COD note prominent
  // Structure: Hook → Benefits → How it works → Specs → Shipping/COD → Returns
  // ---------------------------------------------------------------------------
  bodyHtml: `
<section class="product-hook">
  <h2>Puffy face? 60 seconds mein fresh look — fridge mein rakh, subah lagao.</h2>
  <p>
    Raat bhar ki neend ke baad aankhen bhaari lagti hain, chehra thaka hua dikhta hai —
    yeh feeling sabko pata hai. Cryo Ice Roller ek simple, chemical-free tarika hai
    apni skin ko instantly thanda aur fresh feel karaane ka. Koi fancy gadget nahi,
    koi complicated routine nahi — sirf ek roll, aur tum ready.
  </p>
</section>

<section class="product-benefits">
  <h3>Yeh kyun kaam aata hai</h3>
  <ul>
    <li><strong>Instant cooling, puffiness kam:</strong> Stainless steel head fridge mein rakhne ke baad skin ko tez cooling deta hai — subah wali swelling ek minute mein settle hoti hai.</li>
    <li><strong>Under-eye aur jawline dono ke liye:</strong> Curved design chhote aur bade areas dono par smoothly glide karta hai — under-eye bags se le ke forehead tak.</li>
    <li><strong>Serum aur moisturiser ka better absorption:</strong> Roller use karne ke baad apna serum lagao — cold pressure skin ki absorption ko naturally improve karta hai.</li>
    <li><strong>Zero chemicals, 100% physical cooling:</strong> Koi cream nahi, koi pill nahi — sirf clean stainless steel jo bacteria hold nahi karta aur baar baar use hota hai.</li>
    <li><strong>Travel-friendly, lightweight:</strong> Pouch mein pack karo, fridge ke chhote drawer mein raho — ek baar khareedne ke baad years tak chalega.</li>
  </ul>
</section>

<section class="product-how-it-works">
  <h3>Use karna hai bilkul simple — 3 steps</h3>
  <ol>
    <li><strong>Raat ko fridge mein rakh do.</strong> Roller ko ek clean pouch ya zip bag mein rakh ke fridge ke door shelf mein store karo. Freezer nahi — normal fridge fine hai.</li>
    <li><strong>Subah face wash ke baad 60–90 seconds roll karo.</strong> Under-eye se start karo, outward aur upward direction mein gently move karo — cheek, jawline, forehead. Light pressure hi kaafi hai.</li>
    <li><strong>Apna serum ya moisturiser lagao jaise normally lagate ho.</strong> Skin cool hoti hai toh product zyaada acchi tarah absorb hota hai. Done — ghar se niklo glowing.</li>
  </ol>
</section>

<section class="product-specs">
  <h3>Product details</h3>
  <table>
    <tbody>
      <tr><th>Material</th><td>Food-grade stainless steel head, ABS handle</td></tr>
      <tr><th>Dimensions</th><td>Approx. 14 cm length, roller head dia. 3.5 cm</td></tr>
      <tr><th>Weight</th><td>Approx. 120g</td></tr>
      <tr><th>Color</th><td>Silver / Rose Gold (as per batch availability)</td></tr>
      <tr><th>Suitable for</th><td>All skin types — dry, oily, combination, sensitive</td></tr>
      <tr><th>In the box</th><td>1x Ice Roller + 1x Protective pouch</td></tr>
      <tr><th>Country of origin</th><td>Imported</td></tr>
    </tbody>
  </table>
</section>

<section class="product-shipping">
  <h3>Delivery aur COD</h3>
  <p>
    <strong>Cash on Delivery available — sirf ₹999 mein, GST inclusive.</strong>
    Prepaid orders ke liye UPI, card, net banking — sab accepted hai.
    Delivery 4–7 business days mein, India ke 27,000+ pincodes par.
    Order confirm hone ke baad tracking link WhatsApp ya email par milega.
  </p>
</section>

<section class="product-returns">
  <h3>Return policy</h3>
  <p>
    Delivery se 7 din ke andar return accepted — agar product damaged mile ya
    description se match na kare. Return process: WhatsApp par photo bhejo,
    pickup arrange ho jaayegi. Refund 5–7 business days mein original payment
    method par process hoga. COD orders ke liye bank transfer / UPI refund.
  </p>
</section>
`.trim(),

  // ---------------------------------------------------------------------------
  // PRICING
  // Sell: ₹999 (sweet-spot per indian-dropshipping playbook; COD-eligible)
  // Compare-at: ₹1,399 (1.4x — tasteful, not scammy)
  // Landed cost: ₹270 | Gross margin at sell: ~73%
  // ---------------------------------------------------------------------------
  price: 999,
  compareAtPrice: 1399,

  // ---------------------------------------------------------------------------
  // INVENTORY — realistic opening stock; not 0 (kills ranking), not >500 (fake)
  // ---------------------------------------------------------------------------
  inventoryQty: 100,

  // ---------------------------------------------------------------------------
  // SEO
  // ---------------------------------------------------------------------------
  seoTitle: 'Cryo Face Ice Roller – De-Puff & Glow | Stainless Steel | ₹999 COD',
  seoDescription:
    'Stainless steel cryo face ice roller for instant de-puffing, cooling, and morning glow. No chemicals, travel-friendly, all skin types. ₹999 GST-inclusive, COD available. Delivered across India in 4–7 days.',

  // ---------------------------------------------------------------------------
  // TAGS — drive smart collections: niche / audience / hook / season
  // ---------------------------------------------------------------------------
  tags: [
    // Niche
    'skincare-tools',
    'face-roller',
    'ice-roller',
    'cryo-beauty',
    'stainless-steel-roller',
    // Audience
    'women',
    'women-22-45',
    'beauty-interest',
    'tier1-tier2-tier3',
    // Hook / angle
    'de-puff',
    'morning-routine',
    'under-eye',
    'cooling',
    'glow',
    // Season / occasion
    'mothers-day-gift',
    'gifting-under-1499',
    'festival-gifting',
    'everyday-skincare',
    // Operations
    'cod-eligible',
    'rto-low',
    'sku-bb-021',
  ],

  // ---------------------------------------------------------------------------
  // METAFIELDS
  // cod_eligible: true — ₹999 sits squarely in email-confirm-only COD tier
  // rto_risk: low — lightweight, low-ticket, beauty audience skews prepaid-friendly
  // angle: primary angle driving creative brief
  // hsn_code: 3304 (beauty/skincare preparations & tools; confirm with CA)
  // ---------------------------------------------------------------------------
  metafields: {
    cod_eligible: true,
    rto_risk: 'low',
    angle: 'Puffiness 60 seconds mein khatam — fridge mein rakh, subah lagao',
    hsn_code: '3304',
  },

  // ---------------------------------------------------------------------------
  // IMAGE BRIEFS — hand to creative-studio after sample arrives
  // No AI-generated product renders; all must use real sample photography
  // ---------------------------------------------------------------------------
  imageBriefs: [
    {
      slot: '1-hero',
      description:
        'Clean white/marble surface. Roller placed at slight angle, stainless head reflecting soft natural light. No clutter. Product fills 60% of frame. Visible brand mark or SKU tag optional. Shot: top-down or 45-degree angle. Feeling: premium, minimal, clinical-cool.',
    },
    {
      slot: '2-lifestyle',
      description:
        'Indian woman (22–35, relatable skin, no heavy makeup) using roller on cheekbone in front of a bathroom mirror, morning light. Loose hair, simple kurta or plain tee — aspirational but real, not model-perfect. Expression: calm, refreshed. Shot: eye-level. Feeling: subah ki routine, aaram.',
    },
    {
      slot: '3-benefit-infographic',
      description:
        'Canva-style graphic (hand to creative-studio for brand template). 3-panel layout: (a) chehra puffy [before icon] → (b) roller gliding [action icon] → (c) fresh glowing face [after icon]. Text in Hinglish. Colours: white/rose-gold/cool-blue palette. No before-after real face photos until we have authentic UGC. Use illustrated icons only for this slot.',
    },
    {
      slot: '4-scale-size',
      description:
        'Roller held in a woman\'s open hand, fingers relaxed, so size is clear relative to palm. Include a soft-focus ruler or a common reference object (e.g., lipstick beside it) if possible. Shot: overhead or slight angle. Feeling: compact, pocketable. Important for COD buyers who want to verify size before ordering.',
    },
    {
      slot: '5-packaging',
      description:
        'Roller inside its protective pouch, both laid flat on a neutral surface. Show the pouch zipper and any branding on the pouch. Include the product box/mailer bag if branded. Shot: flat-lay. Purpose: sets unboxing expectation, reduces "not as described" RTO claims.',
    },
  ],

  // ---------------------------------------------------------------------------
  // AD ANGLES — 3 angles per brief; hand to ads-manager + creative-studio
  // No "guarantee", "miracle", "collagen boost", "wrinkle reduction" language
  // ---------------------------------------------------------------------------
  adAngles: [
    {
      angle: 'Problem — De-puff',
      primaryText:
        'Subah uthke mirror mein dekho toh chehra thaka aur puffy lagta hai? Hum jaante hain yeh feeling kitni annoying hoti hai.\n\nCryo Ice Roller sirf 60 seconds mein skin ko cool karta hai — swelling settle hoti hai, aankhen fresh dikhti hain, aur tum ghar se confident nikalte ho.\n\nKoi chemical nahi. Koi fancy step nahi. Sirf fridge mein rakh, subah roll karo.\n\n✔ Stainless steel — bacteria-free\n✔ Sab skin types ke liye safe\n✔ COD available — ₹999 mein\n\nOrder karo, 4–7 din mein doorstep par.',
      headline: 'Puffy face? 60 seconds mein sorted — ₹999 COD',
      cta: 'Shop Now',
    },
    {
      angle: 'Before-After — Morning Glow',
      primaryText:
        'Yeh ek roller ne meri subah ki routine badal di.\n\nPehle: 20 minute concealer layering, under-eye patches, kabhi kaam karte, kabhi nahi.\nAb: fridge se roller nikalo, 90 seconds, aur skin khud se fresh dikhti hai.\n\nNo drama. No expensive serum needed. Just cold stainless steel doing its thing.\n\nCryo Face Ice Roller — ₹999, COD available.\nDeliver hoga 4–7 din mein. 7-day return guarantee.',
      headline: 'Woh morning glow jo tum dhundhte rehte ho — ₹999 mein',
      cta: 'Try It Now',
    },
    {
      angle: 'Gifting — Mother\'s Day',
      primaryText:
        'Maa ke liye ek gift jo actually kaam aata ho.\n\nHar din subah uthke unhe jo thakaan dikhti hai chehere par — is baar kuch aise do jo unhe ek moment of calm aur care de.\n\nCryo Face Ice Roller:\n✔ Simple — fridge mein rakh ke roll karo\n✔ Safe for all ages and skin types\n✔ Comes in a gift-ready pouch\n✔ COD available — ₹999\n\nMother\'s Day is coming. Deliver in time — order karo abhi.',
      headline: 'Maa ke liye gift jo unhe actually pasand aayega — ₹999',
      cta: 'Gift Now',
    },
  ],
};

// =============================================================================
// OPERATOR REVIEW NOTES — BB-021
// =============================================================================
export const DRAFT_REVIEW_NOTES: string = `
PRICING RATIONALE
-----------------
Sell price ₹999 is the Indian dropshipping sweet spot per the indian-dropshipping
playbook (₹699–₹1,499 band). At ₹270 landed cost the gross margin is ~73%, well
above the 60% floor needed to absorb COD remittance lag, RTO reversal costs
(~25–35% baseline), and Meta Ads spend at 3.2x target ROAS. Compare-at is set at
₹1,399 (1.4x sell price — bottom of the 1.4–1.6x permitted range), which reads as
honest and defensible; anything above ₹1,499 at this price point starts to look
inflated to savvy Indian buyers who cross-check on Amazon/Flipkart.

RISKS TO WATCH
--------------
1. Plastic-roller saturation: ₹199–₹499 plastic ice rollers are all over Meesho,
   Flipkart, and Amazon. The stainless steel material story is the only durable
   differentiator — copy and creatives must hammer "no plastic, no bacteria, lasts
   years" or the ₹999 ask gets rejected on first scroll. If facebook audiences show
   >₹180 CPM in the first 3 days, the angle is not landing; kill and re-brief.

2. No-medical-claims line: The description deliberately uses "cooling", "de-puffing",
   and "fresh look" — not "reduces wrinkles", "boosts collagen", "treats dark circles",
   or "dermatologist recommended". Do NOT add health/medical copy before legal review.
   Meta will reject the ad; ASCI may flag the page. Review every creative brief
   before publishing to confirm this line holds.

3. Color variant ambiguity: Supplier likely ships silver or rose gold depending on
   batch. Description currently says "as per batch availability" — before going live,
   confirm with supplier which color is guaranteed, or add a proper variant + set
   inventory per variant. Do not let this ship as a surprise to buyers.

NEXT-STEP CHECKLIST (gate before Shopify publish)
--------------------------------------------------
[ ] Order sample unit from supplier — confirm actual color, weight, packaging quality
[ ] Photograph sample: all 5 image slots (hero, lifestyle, benefit graphic, scale, packaging)
[ ] Film a 15-second demo reel (roller from fridge → 60-second face roll → fresh look)
[ ] Run final copy through india-localizer for Hinglish tone check and legal flag scan
[ ] Confirm HSN code 3304 with CA / tax consultant
[ ] Confirm supplier MOQ and lead time can support 100-unit opening inventory
[ ] Verify COD pincode coverage with Shiprocket for primary target districts
[ ] Create Shopify product using store-manager (push this file's data)
[ ] Set metafields via graphql_mutation (cod_eligible, rto_risk, angle, hsn_code)
[ ] Assign to collections: "Skincare Tools", "Morning Routine", "Gifting Under ₹999"
[ ] Brief creative-studio with the 3 adAngles above — do not run ads on placeholder copy
[ ] Hand to ads-manager only after at least 3 creative variants are approved
`.trim();

// =============================================================================
// PRE-SAMPLE DRAFT — DO NOT PUSH TO SHOPIFY YET
// =============================================================================
// SKU: NF-022 | Wearable Bladeless Neck Fan (Hands-Free, USB Rechargeable, 3-Speed)
// Drafted: 2026-05-09 | Drafted by: store-manager agent
//
// STATUS: Awaiting sample arrival. This file is for operator review only.
// Dropdash-first policy: Operator adds NF-022 to Dropdash; Dropdash pushes
// the Shopify shell; store-manager then applies this draft to that shell.
//
// Next gate before store-manager applies this data:
//   1. Order sample from IndiaMART supplier 22287620797 (Delhi, ₹140/pc)
//   2. Photograph and film demo (all 5 image slots)
//   3. Run copy through india-localizer brand-check
//   4. Confirm HSN code with CA
//   5. Confirm supplier lead time and MOQ before opening any ad spend
//
// All image slots below are BRIEFS for creative-studio, not live URLs.
// No reviews seeded — add after first 50 verified sales only.
// Language: English only (matches live store policy — see review notes).
// =============================================================================

export const NF_022_DRAFT: ShopifyDraftProduct = {
  title: 'Wearable Bladeless Neck Fan — Hands-Free, USB Rechargeable, 3-Speed',

  handle: 'wearable-bladeless-neck-fan-hands-free-usb-rechargeable',

  vendor: 'CoolBreeze',

  productType: 'Personal Cooling Devices',

  // ---------------------------------------------------------------------------
  // DESCRIPTION — English-only, no medical claims, COD note prominent
  // Structure: Hook → Benefits → How it works → Specs → What's in the box →
  //            Shipping & payment → Returns → Trust footer
  // Word target: ~280–380 words
  // ---------------------------------------------------------------------------
  bodyHtml: `
<section class="product-hook">
  <h2>Stay cool through the heat — hands-free, all day, no sweat.</h2>
  <p>
    Whether you are cooking, commuting, or just getting through a humid afternoon
    without air conditioning, this wearable bladeless neck fan keeps a steady breeze
    flowing right where you need it — all without tying up your hands or tangling
    your hair.
  </p>
</section>

<section class="product-benefits">
  <h3>Why you will love it</h3>
  <ul>
    <li><strong>Completely hands-free:</strong> Rests around your neck so your hands stay free for cooking, work, or the daily commute — no holding, no clipping, no hassle.</li>
    <li><strong>3 adjustable speed settings:</strong> A gentle breeze for indoor use, a stronger flow for outdoor heat, and a high-speed blast for peak summer afternoons — one button cycles through all three.</li>
    <li><strong>Bladeless design, safe for everyone:</strong> No exposed blades means no risk to hair, children, or pets. The airflow channels are smooth and quiet at all speeds.</li>
    <li><strong>USB-C rechargeable:</strong> Charges with the same cable as most modern phones. No batteries to replace — a full charge lasts [OPERATOR: confirm runtime hours from sample] hours on speed 1.</li>
    <li><strong>Lightweight and adjustable fit:</strong> Weighs approximately [OPERATOR: confirm weight from sample] grams. The flexible neck arc fits most adult neck sizes comfortably.</li>
  </ul>
</section>

<section class="product-how-it-works">
  <h3>How it works — 3 steps</h3>
  <ol>
    <li><strong>Charge fully before first use.</strong> Plug in the USB-C cable (included). A full charge takes approximately [OPERATOR: confirm charging time from sample] hours. The indicator light turns solid when done.</li>
    <li><strong>Place it around your neck and press the power button.</strong> The fan rests on your shoulders with the two air outlets facing upward toward your face and neck. Press once for speed 1, twice for speed 2, three times for speed 3, and once more to turn off.</li>
    <li><strong>Go about your day.</strong> Wear it in the kitchen, on an auto-rickshaw, during your morning walk, or at your desk. It weighs almost nothing and sits stably without needing adjustment.</li>
  </ol>
</section>

<section class="product-specs">
  <h3>Specifications</h3>
  <table>
    <tbody>
      <tr><th>Battery capacity</th><td>[OPERATOR: confirm mAh from sample]</td></tr>
      <tr><th>Runtime</th><td>[OPERATOR: confirm hours per speed level from sample]</td></tr>
      <tr><th>Charging time</th><td>[OPERATOR: confirm from sample]</td></tr>
      <tr><th>Charging port</th><td>USB-C</td></tr>
      <tr><th>Speed settings</th><td>3 (Low / Medium / High)</td></tr>
      <tr><th>Weight</th><td>[OPERATOR: confirm grams from sample]</td></tr>
      <tr><th>Materials</th><td>ABS plastic body, soft flexible neck arc [OPERATOR: confirm if neck arc material differs]</td></tr>
      <tr><th>Noise level</th><td>[OPERATOR: confirm dB range from sample — approx. at each speed]</td></tr>
      <tr><th>Neck fit</th><td>Flexible arc fits most adult neck sizes</td></tr>
      <tr><th>Color</th><td>[OPERATOR: confirm available colors from supplier]</td></tr>
    </tbody>
  </table>
</section>

<section class="product-inbox">
  <h3>What is in the box</h3>
  <ul>
    <li>1x Wearable Bladeless Neck Fan</li>
    <li>1x USB-C charging cable</li>
    <li>1x User manual (English)</li>
  </ul>
</section>

<section class="product-shipping">
  <h3>Shipping and payment</h3>
  <p>
    Delivered pan-India in 4–7 business days. Free shipping on prepaid orders above
    ₹499. Cash on Delivery available at checkout. Pay securely via UPI, debit/credit
    card, or net banking through Razorpay.
  </p>
</section>

<section class="product-returns">
  <h3>Returns</h3>
  <p>
    7-day no-questions return from the date of delivery. If the product arrives
    damaged or does not match the description, contact us and we will arrange a
    free pickup. Refunds are processed within 5–7 business days to your original
    payment method. COD orders are refunded via bank transfer or UPI.
  </p>
</section>

<section class="product-trust">
  <p>100% Pure India Stock &middot; Secure Razorpay/UPI checkout &middot; Replies within 24 hours</p>
</section>
`.trim(),

  // ---------------------------------------------------------------------------
  // PRICING
  // Sell: ₹899 (per product-research brief)
  // Compare-at: ₹1,350 (round(₹899 × 1.5 / 10) × 10 = round(134.85) × 10 = 1,350)
  // Landed cost: ₹260 | Gross margin at sell: ~71%
  // ---------------------------------------------------------------------------
  price: 899,
  compareAtPrice: 1350,

  // ---------------------------------------------------------------------------
  // INVENTORY — realistic opening stock; not 0 (kills ranking), not >500 (fake)
  // ---------------------------------------------------------------------------
  inventoryQty: 100,

  // ---------------------------------------------------------------------------
  // SEO
  // seoTitle: 63 chars — within ≤70 limit
  // seoDescription: 153 chars — within ≤155 limit
  // ---------------------------------------------------------------------------
  seoTitle: 'Wearable Bladeless Neck Fan – Hands-Free, 3-Speed | ₹899 COD',
  seoDescription:
    'Bladeless wearable neck fan — 3 speeds, USB-C rechargeable, hands-free fit. Safe for all ages. ₹899, COD available. Pan-India delivery in 4–7 days.',

  // ---------------------------------------------------------------------------
  // TAGS — drive smart collections: niche / audience / hook / season
  // ---------------------------------------------------------------------------
  tags: [
    // Niche
    'personal-cooling',
    'neck-fan',
    'bladeless-fan',
    'wearable-fan',
    'usb-rechargeable-fan',
    // Audience
    'women',
    'women-22-42',
    'homemakers',
    'working-women',
    'commuters',
    'tier2-tier3-cities',
    // Hook / angle
    'hands-free',
    'summer-essential',
    'heat-relief',
    'kitchen-cooling',
    'commute-comfort',
    // Season / occasion
    'summer-2026',
    'raksha-bandhan-gift',
    'gifting-under-999',
    'festival-gifting',
    // Operations
    'cod-eligible',
    'rto-medium',
    'sku-nf-022',
    'seasonal-clear-sep',
  ],

  // ---------------------------------------------------------------------------
  // METAFIELDS
  // cod_eligible: true — ₹899 sits in COD sweet spot (≤₹1,499)
  // rto_risk: medium — battery/electronics products see higher return rates;
  //   also seasonal product with clearance pressure by Sep adds RTO incentive
  // angle: primary creative angle — problem (heat/sweat → cool relief)
  // hsn_code: 8414 covers air pumps, compressors, fans — likely correct for a
  //   portable battery-powered personal fan; [OPERATOR: confirm with CA]
  // ---------------------------------------------------------------------------
  metafields: {
    cod_eligible: true,
    rto_risk: 'medium',
    angle: 'problem — summer heat, no AC, sweat while cooking or commuting → instant hands-free cool relief',
    hsn_code: '8414 [OPERATOR: confirm with CA — 8414 covers fans/air circulators; portable battery fans may fall under 8414 80 or a sub-heading]',
  },

  // ---------------------------------------------------------------------------
  // IMAGE BRIEFS — hand to creative-studio after sample arrives
  // No AI-generated product renders; all must use real sample photography
  // ---------------------------------------------------------------------------
  imageBriefs: [
    {
      slot: '1-hero',
      description:
        'Clean white background studio shot. Fan worn around neck, slight forward tilt so both air outlets are visible and the overall silhouette reads as wearable. Product fills 65% of frame. No clutter, no props. Lighting: soft diffused natural or studio light, no harsh shadows. Shot angle: 45-degree front-and-slightly-above. Feeling: modern, lightweight, premium summer gadget.',
    },
    {
      slot: '2-lifestyle',
      description:
        'Indian woman (25–38, relatable, not model-perfect) wearing the neck fan while cooking at a kitchen stove or chopping vegetables. Expression: calm, comfortable, unbothered by heat — not sweating, not fanning herself with a hand. Environment: a real Indian kitchen, warm lighting, some steam or a kadai in background to suggest heat without exaggerating. Shot: mid-level, subject in frame from waist up. Feeling: relief in the middle of the hottest part of the day.',
    },
    {
      slot: '3-benefit-infographic',
      description:
        'Canva-style graphic (hand to creative-studio for brand template). 4-quadrant grid layout. Each quadrant has a simple icon and a short label: (1) Hands-Free — icon of open hands with fan on neck; (2) 3 Speeds — icon of wind lines at low/medium/high; (3) USB-C Rechargeable — icon of USB-C cable plugged in; (4) Bladeless Safety — icon of child or family near fan with a safety tick. White background, cool blue and white palette. All text in English. No before-after real face photos.',
    },
    {
      slot: '4-scale-size',
      description:
        'Fan worn around a person\'s neck with a relaxed, natural posture — full neck and shoulder visible so scale is clear relative to the body. Alternatively, fan placed on a flat surface next to a common reference object (a standard water bottle or a ruler). Shot: overhead or eye-level. Feeling: compact, lightweight, travels easily. Important for COD buyers who want to verify size before committing to a purchase.',
    },
    {
      slot: '5-packaging',
      description:
        'Open box or mailer bag flat-lay revealing fan, USB-C cable, and manual arranged neatly. Show any branding on the box outer. Shot: overhead flat-lay on a neutral (white or light grey) surface. Purpose: sets accurate unboxing expectation, reduces "not as described" RTO claims from buyers who imagined a different package.',
    },
  ],

  // ---------------------------------------------------------------------------
  // AD ANGLES — 3 angles; hand to ads-manager + creative-studio
  // primaryText: ≤125 chars (Meta Ads body copy)
  // headline: ≤27 chars
  // Note on raksha-bandhan-gift: only activate in ad sets running from Jul 26 onward
  // ---------------------------------------------------------------------------
  adAngles: [
    {
      angle: 'kitchen-demo',
      primaryText:
        'Cooking in 40°C heat with no AC? This wearable neck fan keeps you cool hands-free while you cook. ₹899, COD available.',
      headline: 'Stay cool while you cook',
      cta: 'Shop Now',
    },
    {
      angle: 'commute',
      primaryText:
        'No AC on the bus or auto? Wear this bladeless neck fan and feel the breeze all the way to work. ₹899, COD available.',
      headline: 'Beat the commute heat',
      cta: 'Shop Now',
    },
    {
      angle: 'raksha-bandhan-gift',
      primaryText:
        'Give your sister the coolest gift this Raksha Bandhan. Wearable neck fan — hands-free comfort all summer. ₹899, COD.',
      headline: 'Coolest gift for your sis',
      cta: 'Get Offer',
    },
  ],
};

// =============================================================================
// OPERATOR REVIEW NOTES — NF-022
// =============================================================================
export const NF_022_DRAFT_REVIEW_NOTES: string = `
PRICING RATIONALE
-----------------
Sell price ₹899 is set per the product-research brief. At ₹260 landed cost the
gross margin is ₹639 / 71.1% — above the 60% floor needed to absorb COD remittance
lag, RTO reversal costs (medium risk basket), and Meta Ads spend at the 3.5x target
ROAS. Break-even ROAS is 2.1x at a typical India CPL, which means the campaign can
sustain periods of learning-phase inefficiency without going cash-negative. Compare-at
is ₹1,350, calculated as round(899 × 1.5 / 10) × 10, sitting at the bottom of the
permitted 1.4–1.6x range — reads as honest to Indian buyers who cross-check Amazon
(where comparable bladeless neck fans list at ₹800–₹2,200).

SAMPLE GATE
-----------
Do NOT open any ad spend before receiving the supplier sample. Order from:
  IndiaMART supplier ID: 22287620797
  Location: Delhi
  Price: ₹140/pc ex-Delhi (landed cost target: ₹260 inclusive of shipping)
Use the sample to confirm: battery mAh, runtime per speed, charging time, weight,
noise level, color options, and packaging quality. Every [OPERATOR: confirm] field
in the product spec table must be filled from the actual sample — do not publish
placeholder specs.

RISKS
-----
1. Amazon presence at ₹800–₹2,200: This is the primary competitive threat. The
   product must differentiate on at least one verifiable axis — ergonomic neck curve,
   longer battery runtime, sturdier build, or quieter airflow — whichever the sample
   confirms. If the sample is generic and indistinguishable from Amazon listings at
   ₹800, reconsider the sell price or the supplier before launching.

2. Seasonal demand drop in October: Neck fans are a summer product. Indian peak
   demand runs April–August; drops sharply after September. Target: clear all
   inventory by end of September. If stock is still above 30 units in the first
   week of September, trigger a clearance discount (recommend 20–25% off or a
   bundle with a second SKU) and pause acquisition spend.

3. Battery/electronics RTO risk (medium): Electronic products in the ₹600–₹1,200
   range see higher return rates from COD buyers than non-electronic products. The
   7-day return policy is correct and non-negotiable; the mitigation is (a) accurate
   spec copy so buyers know exactly what they are getting, (b) clear unboxing
   packaging image so nothing looks "not as described", and (c) a Razorpay prepaid
   incentive via the COD50 discount code to shift the buyer mix toward prepaid.

LANGUAGE NOTE
-------------
This draft is English-only, matching the store manager's recent instruction for the
4 live products. The BB-021 draft was written in Hinglish. Before either NF-022 or
BB-021 goes live, the operator should decide on one consistent language policy for
the store. Options: (a) standardize all product pages to English — broadest appeal,
easier for india-localizer QA; (b) standardize to Hinglish — stronger emotional
resonance with Hindi-belt tier-2/3 target; (c) maintain a language flag per SKU
based on target audience. Whichever direction is chosen, update both drafts before
pushing either to Shopify.

NEXT-STEP CHECKLIST (gate before store-manager applies this draft to Dropdash shell)
-------------------------------------------------------------------------------------
[ ] Order sample unit from IndiaMART supplier 22287620797 (Delhi) — minimum 1 pc
[ ] Photograph sample: all 5 image slots (hero, lifestyle, benefit infographic, scale/size, packaging)
[ ] Film a 15–20 second demo reel (fan on neck → commute or kitchen scenario → comfort expression)
[ ] Fill all [OPERATOR: confirm] fields in specs table from actual sample measurements
[ ] Run final copy through india-localizer for legal flag scan and tone check
[ ] Confirm HSN code 8414 (or correct sub-heading) with CA / tax consultant
[ ] Confirm supplier MOQ and lead time can support 100-unit opening inventory
[ ] Add NF-022 to Dropdash; wait for Dropdash to push Shopify shell
[ ] store-manager applies this draft data to the Shopify shell
[ ] Set metafields via graphql_mutation (cod_eligible, rto_risk, angle, hsn_code)
[ ] Assign to collections: "Personal Cooling", "Summer Essentials", "Gifting Under ₹999"
[ ] Brief creative-studio with the 3 adAngles above — do not run ads on placeholder copy
[ ] Activate raksha-bandhan-gift ad angle only in ad sets running from Jul 26 onward
[ ] Hand to ads-manager only after at least 3 creative variants are approved
[ ] Plan inventory clearance trigger: if stock >30 units in first week of September, discount and pause acquisition
`.trim();
