# Visual Direction

## Approved working direction

![Smoke Break Cat character and VFX direction](art/smoke-break-cat-art-direction-v1.png)

The first production direction is **grimy neo-retro arcade illustration**: hard inked silhouettes, limited animation-friendly shading, screen-print texture, and bright effects with strict value separation. It should feel funny, hostile, and handmade—not like a generic cute mobile mascot.

This board is a concept anchor, not a sprite atlas. Runtime poses are generated separately with an identity-locked reference workflow, checked for real alpha transparency, optimized for the web, and integrated as individual poses or fixed-grid animation sheets.

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
| `public/assets/characters/street-cat-run-v1.png` | Identity-preserving generation from the neutral pose plus alpha extraction; optimized project copy | Legacy single gallop pose; superseded at runtime | `4556d8c13225d2afe0be1396388e46d53548814670dcd8918a926ab8583313d9` |
| `public/assets/characters/street-cat-jump-v1.png` | Identity-preserving generation from the neutral pose plus alpha extraction; optimized project copy | Shipped jump pose | `9b5f5d6ac68295c91afe76d0c4ab9cb8066f126b4d2541fb04a8c31d6f2d0759` |
| `public/assets/characters/street-cat-run-cycle-v2.png` | Identity-preserving six-frame generation from the neutral pose; deterministic checkerboard-to-alpha cleanup; optimized project copy | Shipped 3×2 run-cycle atlas | `03a6b4cb7550603b5f5df74fef4b2c437ecbcc57cd08ee577d675be2f6b6478c` |
| `public/assets/characters/street-cat-puff-cycle-v1.png` | Identity-preserving four-frame generation from the neutral pose; deterministic checkerboard-to-alpha cleanup; optimized project copy | Shipped 2×2 encounter-action atlas | `ed5659188f80eba76cf1aedbedb9730e79c9ad77232cc0240900bec704021144` |
| `public/assets/hazards-ground-v1.png` | OpenAI built-in image generation; deterministic neutral-checkerboard-to-alpha cleanup; measured crop metadata; optimized project copy | Shipped 3×2 ground-hazard and loot atlas | `60a4f13eb3a621e6c5c96b049291b2ce138940f59c260a0f2858c1d33bcf72aa` |
| `public/assets/hazards-flying-v1.png` | OpenAI built-in image generation; deterministic alpha extraction; measured crop metadata; optimized project copy | Shipped 3×2 two-frame aerial-hazard atlas | `5f6684c1f61253bd337668c379140475c066dac7f573bd398112130e206e190f` |
| `public/assets/cosmetics-glasses-v1.png` | OpenAI built-in image generation; targeted cloth-removal edit; deterministic checkerboard-to-alpha cleanup; measured crop metadata | Shipped 4×3 atlas containing 11 eyewear cosmetics and one empty cell | `9691cc5eb957cde2601538cfd3cc57a0deed0a830929ebbc00c4f72d881a83f2` |
| `public/assets/cosmetics-hats-v1.png` | OpenAI built-in image generation; deterministic color-mask expansion preserving dark outlines; measured crop metadata | Shipped 4×3 atlas containing 11 hat cosmetics and one empty cell | `a824a378122ae2d29aacff0c380915ec5109654ea3db82c582ca2c91032696a9` |
| `public/assets/smokeables-original-v1.png` | OpenAI built-in image generation; deterministic checkerboard-to-alpha cleanup; per-cell resize and measured crop metadata | Shipped 4×3 atlas containing all 11 Original-mode encounter props and one empty cell | `9cbe85fcab403f3c988717ddac7db1d8f94f8fc0d2045e368cd0201e1a22a67a` |
| `public/assets/smokeables-candy-v1.png` | OpenAI built-in image generation; deterministic checkerboard-to-alpha cleanup; per-cell resize and measured crop metadata | Shipped 4×3 atlas containing all 11 Candy-mode encounter props and one empty cell | `5ea08d048fdfe3816c04488cb5837da4adce3a6fe9edabf6c09cab8b1e6c66a1` |

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

Run-cycle atlas:

> Create exactly six sequential side-view running animation frames of the neutral cat, facing right, in a strict 3-column by 2-row grid: left contact, recoil/compression, passing, right contact, opposite recoil/compression, and airborne extension returning to frame one. Preserve head shape, taped nicked ears, eyes, muzzle, paws, bandana, markings, outline, shading, texture, scale, and camera angle. Keep one full cat per cell, a shared ground-contact baseline, stable torso/head travel, generous padding, and no overlaps, labels, props, effects, floor, shadow, background, or redesign.

Encounter-action atlas:

> Create exactly four sequential side-view encounter-action frames of the neutral cat in a strict 2-column by 2-row grid: tense ready, anticipation leaning into a drag or bite, strong pull/bite recoil, and recovery/exhale. Preserve the complete character identity, body volume, scale, camera angle, line weight, color, and texture. Keep the mouth corner as the animation pivot for a separate runtime prop, keep contact paws on a shared ground line, and include no prop, smoke, confetti, effect, floor, shadow, labels, or background.

Ground-hazard atlas:

> Create exactly six isolated side-view game sprites in a strict 3-column by 2-row grid: crushed silver street can, battered orange traffic cone, red fire hydrant, low iridescent oil puddle, hostile gray pigeon facing left, and gold/midnight/mint loot chest. Match the approved grimy neo-retro arcade direction with heavy ink, compact readable silhouettes, limited shading, chipped screen-print texture, generous cell padding, consistent camera angle, and no labels, dividers, scenery, extra objects, or redesign.

Aerial-hazard atlas:

> Create exactly six isolated side-view game sprites in a strict 3-column by 2-row grid: crow facing left with wings up, crow facing left with wings down, bat facing left with wings up, bat facing left with wings down, compact street-surveillance drone level, and the same drone banking. Match the approved heavy-ink, limited-shading, grimy arcade style; keep animation pairs identity-locked, centered, and readable at phone scale with no labels, dividers, trails, floor, shadows, scenery, or extra objects.

Eyewear atlas:

> Create exactly eleven isolated side-view eyewear cosmetics in a strict 4-column by 3-row grid: midnight shades, brass rounds, coral hearts, acid-lime shield glasses, mint cyber visor, gold stars, battered goggles, brass monocle, cardboard 3D glasses, gold lightning lenses, and black laser visor. Leave the final cell empty. Match the approved heavy-ink, chipped screen-print finish; align every item for the right-facing cat; use genuine transparent alpha; include no cat parts, cloth, text, dividers, shadows, scenery, or extra objects.

Hat atlas:

> Create exactly eleven isolated side-view hat cosmetics in a strict 4-column by 3-row grid: dockworker beanie, battered trucker cap, outlaw cowboy hat, crooked wizard hat, chipped crown, dented bucket hat, devil horns, propeller beanie, halo, street-chef toque, and traffic-cone crown. Leave the final cell empty. Match the approved heavy-ink, chipped screen-print finish; align every item for the right-facing cat; use genuine transparent alpha; include no cat parts, text, dividers, shadows, scenery, or extra objects.

Original encounter-device atlas:

> Create a strict 4×3 transparent atlas of right-facing side-view props: cigarette, menthol cigarette, nurse-themed cigarette, gold-filter cigarette, ghost cigarette, cigar, compact vape, boss vape mod, compact hookah with right-facing hose, compact bong with right-facing mouth tube, and boss industrial smoking machine with right-facing mouth tube; leave the final cell empty. Match the approved heavy black ink, limited warm palette, distressed screen-print texture, consistent lighting, cell padding, and phone-scale silhouette. No labels, brands, cats, hands, scenery, smoke clouds, or overlap.

Candy encounter-device atlas:

> Create a strict 4×3 transparent atlas of right-facing harmless candy props: striped candy stick, mint stick, heart wafer, honeycomb stick, ghost sour belt, chocolate wafer roll, juice box with right-facing straw, boss soda dispenser, sundae with right-facing spoon, gumball dispenser, and boss candy-crusher machine with right-facing candy tube; leave the final cell empty. Match the approved heavy black ink, playful limited candy palette, distressed screen-print texture, consistent lighting, cell padding, and phone-scale silhouette. No labels, brands, cats, hands, cigarettes, smoke, scenery, or overlap.

The original individual poses required targeted background extraction because their first versions used baked checkerboards. The run-cycle generator also baked its checkerboard into the PNG; two constrained extraction edits still returned RGB files, so the shipped atlas uses a deterministic neutral-checkerboard-to-alpha conversion with softened antialiased edge pixels. The full-resolution generated originals remain unmodified outside the project copy.

## Runtime implementation

- The title screen now presents the actual character art.
- Ground movement advances through six authored frames at a speed-limited 10–13 fps. Each frame uses a measured paw baseline and horizontal compensation so the body changes pose without skating on the road.
- Jumping stages compression and extension frames before the dedicated airborne pose, rotates subtly with vertical velocity, and returns through a timed landing recoil with a small dust burst.
- Encounters advance through ready, anticipation, pull/bite recoil, and recovery frames on a 340 ms input cadence. Rapid hold input restarts only after the impact phase so it cannot trap the cat on one pose.
- The single separate Original/Candy prop layer follows per-frame measured mouth sockets through the same foot-pivot scale and rotation matrix. Stick props flip toward the facing direction; devices use per-visual mouthpiece, hose, straw, or serving-edge sockets. The former duplicate pedestal prop is not rendered during encounters.
- Original puff VFX use thin inked curls, partial arcs, and small translucent cores. Candy mode emits outlined directional sprinkles; neither effect obscures the character action.
- Ground hazards now use measured atlas crops and bottom anchors so illustrated silhouettes replace the procedural placeholders without changing collision geometry. Puddle width, pigeon posture, and hydrant height deliberately exaggerate visual anticipation while preserving the original hit boxes.
- Crows, bats, and drones alternate between two authored frames using the existing flap clock. Their collision rectangles, sine-wave paths, trajectory ribbons, and low-swoop warning remain deterministic and unchanged.
- Floating loot uses the same production atlas, retaining the existing bob, aura, suspension hooks, reward rules, and headbutt collision contract.
- Eyewear and hats now use separate production atlases with measured crops. They render inside the same foot-pivot transform as the active run, jump, landing, and encounter pose, so squash, rotation, and recoil cannot detach them from the cat.
- Skin filters again receive distinct code-native markings on the generated sprite path. The Bone Cat renderer key is corrected, and the animated closet preview can display locked combinations without changing the equipped save.
- Environmental motion now includes neon scan/flicker, breathing windows, street steam, swaying wires, a pulsing moon, type-specific ground-hazard motion, drone rotor/lights, orbiting loot sparks, and animated encounter-device embers/screens/bubbles.
- Original and Candy encounter props now use separate production atlases with identical visual keys and shared mechanics. Every crop is anchored by its right-side mouth contact and flipped at runtime for the right-facing cat; stick crops shorten from the ember/bite end while the mouth end remains fixed.
- Encounter staging adds a mode-aware focus wash, pulsing ground aura, concentric device rings, boss orbit chevrons, and puff-timed impact particles behind the character and HUD.
- The city renderer now uses inked building silhouettes, brick lines, neon windows, fire escapes, cables, road cracks, moon glow, sprint streaks, and a screen vignette.
- Hats and glasses remain separate canvas layers. Skin palette filters are provisional until dedicated color masks or layered sprites replace them.
