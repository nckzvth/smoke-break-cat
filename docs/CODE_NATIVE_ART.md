# Code-Native Art Direction — Gremlin Zine

## Decision

Both the generated-raster direction and the rounded neon Gremlin Cut are rejected. The shipping game uses a raw punk-editorial vector language: imperfect screen-print shapes, paper/ink contrast, offset shadows, pasted street bills, and authored whole-pose animation. Character, skins, hats, glasses, hazards, loot, smokeables, candy equivalents, animation, and VFX remain deterministic and code-native unless the owner explicitly approves a different source.

## Identity

Smoke Break Cat is a bootleg midnight zine about one permanently unimpressed urban cat gremlin. The mascot must be recognizable from its silhouette alone:

- oversized rounded sticker head and tiny upright biped body, with no literal neck mass;
- two short legs, two articulated arms, compact sneakers, cropped bomber/hoodie, and a low question-mark tail;
- a three-quarter face aimed into the run direction; the mascot must never stare squarely at the camera;
- oversized dark asymmetric eyes with a smaller far eye, dominant near eye, and irregular painted brows;
- cream muzzle, pink nose, one stupid snaggletooth;
- visible hands and feet, with the encounter device attached directly to the mouth.

The cat is ugly-cute by design. Awkwardness is allowed when it makes the expression funnier; generic polish is not.

## Rendering rules

- Use imperfect near-black ink, warm paper, simple filled shapes, offset shadows, and a restrained screen-print palette.
- Preserve one shared mascot renderer across title, gameplay, encounters, and wardrobe preview.
- Skins change the same body through color, patches, stripes, bones, or glow; they never replace the cat's face or silhouette.
- Equippables anchor inside the cat's local head transform and remain readable at phone scale. Eyewear uses a smaller far lens and larger near lens to follow the three-quarter face; hats span the actual skull width and either preserve or deliberately replace the ear silhouette.
- Animate shape transforms, limbs, tails, brows, glow, and accessory parts directly in canvas.
- Use authored idle, run, airborne, and puff poses. A pose must change limb placement and weight, not merely rotate the whole mascot.
- Keep the body upright and chibi. Literal neck, throat, quadruped spine, feline ribcage, haunch, and panther anatomy are rejected.
- During a smoke pose, the lifted near arm replaces its normal run/idle arm. The cat must always have exactly two arms and two legs.
- The run uses six authored biped keys: opposing contact, compression, passing, and flight. The visible/front-layer arm roots on the rear side of the chest; the rear-layer arm roots toward the torso front, preserving the right-facing three-quarter twist. Arms are contralateral—each arm opposes its same-side leg and the two hands never pump in the same direction. Smooth interpolation connects strong silhouettes; it must not disguise weak poses. Far limbs recede but remain readable.
- Every wardrobe card must show a code-drawn thumbnail so the visual reward is legible before it is unlocked or equipped.
- A hover/focus preview always starts from the equipped loadout, swaps only the focused category, and resets on exit. Previewing several cards must never accumulate a phantom mixed loadout.
- Original and Little Baby Idiot props share timing, sockets, scale, and gameplay rules.
- Do not ship generated character, cosmetic, hazard, loot, or encounter-device raster atlases.

## Meme test

A visual earns its place when it passes at least two of these checks:

- readable in a cropped phone screenshot;
- funny without explanatory text;
- makes an unlock feel worth showing a friend;
- unmistakably belongs to Smoke Break Cat;
- becomes funnier when combined with another cosmetic.

The canonical stress loadout is Hell Tiger + Laser Visor + Traffic Cone King. If that combination stops reading as one cat wearing three bad decisions, the layering system has regressed.

## Rejected direction

The prior generated neo-retro raster atlases were removed from the public build and repository on 2026-08-22. The later rounded neon Gremlin Cut, boxed face geometry, capsule torso, and interpolated rig were also rejected. They are recoverable from Git history but are not approved shipping directions.

The subsequent realistic single-profile and quadruped experiments were rejected because the neck read as an awkward growth and the body plan missed the supplied Cat Quest target. The approved construction borrows only the abstraction level and bipedal chibi proportion language of compact action-RPG mascots, replaces fantasy gear with an original bomber-and-sneakers street identity, and does not copy a reference character.
