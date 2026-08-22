# Code-Native Art Direction — Gremlin Cut

## Decision

The generated-raster direction is rejected. The shipping game returns to the prototype's authored canvas language and improves it in place. Character, skins, hats, glasses, hazards, loot, smokeables, candy equivalents, animation, and VFX must be drawn from deterministic code-native shapes unless the owner explicitly approves a different source.

## Identity

Smoke Break Cat is a thick-ink midnight sticker cartoon about one permanently unimpressed street gremlin. The mascot must be recognizable from its silhouette alone:

- long horizontal body and question-mark tail;
- oversized angular head and ears;
- hostile yellow eyes with heavy brows;
- cream muzzle, pink nose, one stupid snaggletooth;
- black bandana and tiny metal stud;
- visible paws and a device attached to the mouth during encounters.

The cat is ugly-cute by design. Awkwardness is allowed when it makes the expression funnier; generic polish is not.

## Rendering rules

- Use thick near-black outlines, simple filled shapes, and a four-accent palette.
- Preserve one shared mascot renderer across title, gameplay, encounters, and wardrobe preview.
- Skins change the same body through color, patches, stripes, bones, or glow; they never replace the cat's face or silhouette.
- Equippables anchor inside the cat's local head transform and remain readable at phone scale.
- Animate shape transforms, limbs, tails, brows, glow, and accessory parts directly in canvas.
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

The prior generated neo-retro raster atlases were removed from the public build and repository on 2026-08-22. Their inconsistent rendering, pose identity, skin treatment, and accessory integration did not meet the product's identity standard. They are recoverable from Git history but are not approved shipping assets.
