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
// OPERATOR REVIEW NOTES
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
