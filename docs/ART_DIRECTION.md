# Visual Direction

## Approved working direction

![Smoke Break Cat character and VFX direction](art/smoke-break-cat-art-direction-v1.png)

The first production direction is **grimy neo-retro arcade illustration**: hard inked silhouettes, limited animation-friendly shading, screen-print texture, and bright effects with strict value separation. It should feel funny, hostile, and handmade—not like a generic cute mobile mascot.

This board is a concept anchor, not a sprite atlas. Runtime poses are generated separately with an identity-locked reference workflow, checked for real alpha transparency, optimized for the web, and integrated as individual assets.

## Character rules

- Keep the hero readable as a ginger alley cat at roughly 65–80 CSS pixels tall.
- Use a nicked-ear, cheek-tuft, heavy-eyelid silhouette to preserve identity without relying on tiny detail.
- Favor a compact body, oversized head, thick paws, and sharp tail gesture.
- Keep skin, glasses, and hat layers independently replaceable.
- Use two-tone shading at most in gameplay sprites; reserve print grain for larger marketing art.
- The encounter prop remains its own layer so Original and Candy modes share the same pose and timing.

## Effects rules

- Speed uses long tapered streaks in coral, mint, gold, or violet.
- Dust uses clustered warm-gray puffs with a few hard flecks.
- Impacts use asymmetric starbursts with one bright core and a dark outline.
- Candy mode replaces smoke wisps with high-contrast confetti, never with collision-obscuring clouds.
- Original smoke stays translucent and desaturated; psychedelic smoke may use violet and mint accents.
- Effects may amplify game feel but must not cover the cat, hazards, encounter meter, or action controls.

## Palette

| Role | Color |
| --- | --- |
| Midnight | `#11131d` |
| Ink | `#08090d` |
| Ginger | `#d9772f` |
| Bone | `#f7f0dc` |
| Coral | `#ff5f57` |
| Mint | `#80e1c1` |
| Gold | `#ffd166` |
| Violet | `#b388ff` |

## Asset provenance

| Asset | Source | Status | SHA-256 |
| --- | --- | --- | --- |
| `docs/art/smoke-break-cat-art-direction-v1.png` | OpenAI built-in image generation, 2026-08-21 | Working concept reference; not shipped in the runtime | `cb8365d06c54fed97f3cf3cc9c087bef79bcb50b72feb63a1c0506840058b395` |
| `public/assets/characters/street-cat-base-v1.png` | OpenAI built-in image generation plus alpha extraction; optimized project copy | Shipped neutral/encounter and title pose | `48ff56aa29ab2d7919dc073fe26e1bd291a066451fb53f17f0ceb91af4133703` |
| `public/assets/characters/street-cat-run-v1.png` | Identity-preserving generation from the neutral pose plus alpha extraction; optimized project copy | Shipped gallop pose | `4556d8c13225d2afe0be1396388e46d53548814670dcd8918a926ab8583313d9` |
| `public/assets/characters/street-cat-jump-v1.png` | Identity-preserving generation from the neutral pose plus alpha extraction; optimized project copy | Shipped jump pose | `9b5f5d6ac68295c91afe76d0c4ab9cb8066f126b4d2541fb04a8c31d6f2d0759` |

Final generation prompt:

> Create a production-oriented landscape visual-development sheet for a mobile-first 2D arcade runner: one consistent scrappy ginger alley-cat hero with a nicked ear, sharp triangular silhouette, exhausted eyes, and troublemaker energy; large side-view pose plus run, jump, hit, and encounter poses; separate speed streak, dust, impact, candy-confetti, and smoke-wisp swatches; matched original cigarette-sized and striped candy-stick encounter props. Use premium hand-inked neo-retro arcade illustration, chunky readable shapes, limited shading, crisp dark outlines, subtle grimy screen-print texture, and a midnight/coral/mint/gold/violet palette. No humans, UI, logos, readable text, watermarks, glossy 3D, photorealism, anime proportions, muddy values, or generic kawaii treatment.

Generation mode: OpenAI built-in image generation.

## Runtime character prompt set

Neutral pose:

> Using the approved board as a style and identity reference, create one game-ready full-body side-view sprite of the same scrappy ginger alley cat facing right in a low run-ready stance. Preserve the taped nicked ears, exhausted yellow eyes, pale muzzle and paws, torn black bandana, heavy ink, two-tone shading, and screen-print texture. Exactly one cat, no prop, effect, floor, shadow, text, or background; genuine alpha transparency.

Run pose:

> Preserve the neutral character identity exactly and render the same cat in a fast side-view gallop facing right, body stretched forward, front paws reaching, rear paws kicked back, and tail streaming upward. No redesign, props, effects, floor, shadow, text, or background; genuine alpha transparency.

Jump pose:

> Preserve the neutral character identity exactly and render the same cat in a dynamic side-view upward jump facing right, body arcing forward, front paws reaching, rear paws tucked, and tail curved upward. No redesign, props, effects, floor, shadow, text, or background; genuine alpha transparency.

Each pose required a targeted background-extraction pass because the first generated version used a baked checkerboard. The shipped copies retain real alpha and were reduced from 5.3 MB total to roughly 1.2 MB without overwriting the full-resolution generated originals.

## Runtime implementation

- The title screen now presents the actual character art.
- Ground movement alternates between contact and gallop poses; jumping uses a dedicated pose; encounters use the neutral pose with a separate Original/Candy prop layer.
- The city renderer now uses inked building silhouettes, brick lines, neon windows, fire escapes, cables, road cracks, moon glow, sprint streaks, and a screen vignette.
- Hats and glasses remain separate canvas layers. Skin palette filters are provisional until dedicated color masks or layered sprites replace them.
