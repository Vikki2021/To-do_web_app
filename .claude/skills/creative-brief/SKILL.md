---
name: creative-brief
description: The brief template every ad creative must satisfy before generation. Used by creative-studio to refuse half-baked requests and to keep output consistent. If a brief is missing required fields, demand them before producing assets.
---

# Creative Brief — Required Fields

`creative-studio` will not generate without ALL of these fields filled.
If a field is missing, demand it from the requester before generating.

## Required

```
PRODUCT:           <name + SKU>
LANDING URL:       <product or advertorial URL>
PRICE / OFFER:     <₹ + COD/discount mention>
HOOK:              <one-sentence problem-promise>
ANGLE:             <one of: problem | dream | curiosity | authority | before-after | social-proof | meme>
AUDIENCE:          <persona, age range, geo, language tier>
LANGUAGE:          <Hinglish | Hindi | English | regional>
FORMAT:            <static | video | carousel | collection>
ASPECT RATIOS:     <1:1 | 4:5 | 9:16 | multi>
DURATION:          <if video: 6s / 10s / 15s / 30s>
PLACEMENTS:        <feed | reels | story | explore | placements-all>
VARIANT COUNT:     <default 6 per angle, 3 angles = 18; Andromeda-era preference is MORE volume>
BRAND ELEMENTS:    <logo on/off, color overlay, font>
COMPLIANCE:        <claims allowed/not, disclaimers needed>
OBJECTION KILLERS: <list the top 3 buyer objections this creative must defuse — see below>
DUE BY:            <date/time>
DELIVERY:          <Drive folder + handoff agent>
```

### Objection Killers — required field

Every Indian COD buyer carries 3-5 silent objections that kill the purchase if unaddressed. The brief MUST name the top 3 for this SKU and how the creative defuses each. If the brief doesn't list objection killers, the creative will leak conversion.

Common objection patterns (pick the top 3 for the product):

| Objection | Killer in creative |
|---|---|
| "Is this a scam?" | COD badge visible, real UGC unboxing, phone number on screen |
| "Will it actually work?" | Demo in the first 5 seconds, not testimonial-only |
| "Is the size right?" | Show product next to a hand / a household object for scale |
| "Will I be cheated on COD?" | "Pay only when you receive" caption + return badge |
| "Is the quality cheap?" | Close-up on material, packaging unbox, "premium feel" demo |
| "What if it breaks?" | "7-day no-questions return" / replacement guarantee on-screen |
| "Will it ship to my pincode?" | "All-India COD delivery" or "Free shipping pan-India" tag |
| "Too expensive?" | Price-anchor: "₹2,000 ki cheez sirf ₹999 mein" with a real reference |

Skip this field = brief returned. No exceptions.

## Optional but recommended

```
TALENT:         <Higgsfield Soul name | generic | specific demographic>
SCENE:          <Indian household / kitchen / outdoor / studio>
PROPS:          <list>
MUSIC MOOD:     <energetic / calm / dramatic / trending>
VOICEOVER:      <yes/no, language, gender, age>
CAPTIONS:       <yes — burned in by default>
COMPETITOR REF: <links to creatives we want to outdo or differ from>
DON'TS:         <e.g., no medical claims, no countdown timers, no fake reviews>
```

## Angle definitions (pick one per creative variant; mix angles across the batch)

- **problem** — open with the pain, agitate, present the product as the fix
- **dream** — open with the desired outcome, show the path back to product
- **curiosity** — open with a "wait, how does this work?" hook to force watch-through
- **authority** — open with credentials/expertise/celebrity-without-rights-issues
- **before-after** — visual transformation, sequenced
- **social-proof** — reviews, UGC clips, "10,000 sold this week"
- **meme** — relatable joke or trend format, native to platform

## Hook bank (use as starting points, not verbatim)

| Angle | Hinglish hook |
|---|---|
| problem | "Roz ki neck pain ka permanent solution chahiye?" |
| dream | "Jaise kisi spa mein ho — ghar baithe, 5 minute mein" |
| curiosity | "Yeh chhota sa device aapki neck pain ka game palat dega" |
| authority | "Doctors recommend karte hain — yahi hai wajah" |
| before-after | "Pehle: 8 ghante ki desk job ke baad. Baad mein: 5 minute is device ke saath" |
| social-proof | "10,000+ logon ne kaha — 'thank you, finally relief'" |
| meme | "POV: kal raat tak office laptop pe kaam karna pada" |

## Hard rules

- Captions burned-in for video. ~85% of Meta video plays in India happen muted.
- First 0.8 seconds must contain the hook visual or text.
- Any health claim ("cures", "guaranteed relief", "doctor approved") requires a written disclaimer placement OR must be removed.
- Indian buyers see through fake — avoid stock-photo aesthetics for UGC angles.
- Brand kit (Canva `list-brand-kits`) is the source of truth for logo + palette + font.
- **Objection killers field is mandatory.** Brief returned if missing.
- **Post-Andromeda creative volume rule** (per EEA Zuck Method): the algorithm rewards creative volume + diversity more than per-asset polish. Default batch = 6 variants × 3 angles = 18 assets. Don't ship fewer than 12. Faster iteration beats slower perfection.

## Sample brief (use as template)

```
PRODUCT:        Portable Neck Massager (NM-001)
LANDING URL:    https://store.example.in/products/nm-001
PRICE / OFFER:  ₹799 — COD available, 10% off prepaid
HOOK:           5 min mein neck pain gone — sirf ₹799
ANGLE:          batch of 3 — problem, before-after, social-proof
AUDIENCE:       30-50, tier-2/3, desk workers + homemakers, Hindi-leaning
LANGUAGE:       Hinglish
FORMAT:         video
ASPECT RATIOS:  9:16, 4:5
DURATION:       10s
PLACEMENTS:     feed, reels, story
VARIANT COUNT:  6 per angle = 18 total
BRAND ELEMENTS: logo bottom-right last 2s
COMPLIANCE:     no "cures" claims; "relief" OK
DUE BY:         2026-05-08 18:00 IST
DELIVERY:       /Creatives/NM-001/2026-05-08/, hand to ads-manager
```
