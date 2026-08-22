# Production Status

Last updated: 2026-08-22 (America/New_York)

## Live surfaces

- Repository: https://github.com/nckzvth/smoke-break-cat
- Public alpha: https://nckzvth.github.io/smoke-break-cat/
- Deployment: GitHub Actions to GitHub Pages with HTTPS enforced

## Completed

- Preserved the original prototype as the baseline commit.
- Documented web-first distribution, public repository visibility, mobile-port boundaries, visual-production strategy, and the Little Baby Idiot Mode contract.
- Added a real production `index.html` and Vite build.
- Added locked dependencies, project validation, CI, Pages deployment, manifest, favicon, `.nojekyll`, and a custom 404 page.
- Removed forced user-zoom blocking.
- Fixed the short-landscape start-screen clipping.
- Fixed compact-phone encounter HUD overlap.
- Fixed character positioning when orientation changes during an encounter.
- Added persistent Original and Little Baby Idiot presentation modes without duplicating game rules.
- Added complete candy presentations and code-native props for all 11 street and boss encounters.
- Added unit coverage that enforces complete mappings and verifies presentation swaps preserve mechanics.
- Established a generated neo-retro character/VFX concept anchor with documented palette, layering rules, prompt, source, and usage status.
- Added optimized transparent neutral, gallop, and jump character assets generated from the approved identity reference.
- Integrated real character art into the title, run, jump, and encounter states while retaining separate cosmetic and Original/Candy prop layers.
- Replaced the binary neutral/gallop pose swap with a six-frame identity-locked run atlas, measured paw anchors, speed-limited frame timing, staged takeoff, velocity-aware airborne rotation, and landing recoil.
- Attached every encounter prop to the cat's mouth through per-device sockets, moved puff/confetti emission to the mouth, and removed the duplicate encounter-pedestal prop.
- Added a four-frame encounter-action atlas with ready, anticipation, pull/bite recoil, and recovery phases; transformed prop/cosmetic sockets; rapid-input-safe cadence; and inked curl/sprinkle VFX.
- Replaced all five procedural ground hazards and the floating loot placeholder with a measured six-sprite production atlas while preserving spawn timing, collision boxes, bobbing, rewards, and mode parity.
- Replaced procedural crow, bat, and drone bodies with paired authored animation frames while preserving their wave paths, warning ribbons, low-swoop indicators, and collision geometry.
- Repaired the cosmetic regression introduced by the generated character path: restored per-skin markings, corrected the Bone Cat renderer key, and moved eyewear/hats inside the pose-local transform so accessories follow run, jump, squash, recoil, and encounter animation.
- Replaced all 22 non-default code-placeholder hats and glasses with two measured production-art atlases while retaining code-native loading fallbacks.
- Added an animated closet loadout preview with safe preview-only handling for locked items and immediate persistent equip behavior for owned items.
- Added overt non-character motion to neon signs, windows, moon glow, overhead wires, street steam, every ground-hazard class, aerial threat details, loot, and Original/Candy encounter devices.
- Replaced all 22 Original/Candy procedural encounter-device bodies with paired production atlases, measured crop metadata, burn-aware stick cropping, and mouth-end anchors; the code-native bodies remain loading fallbacks only.
- Added encounter focus lighting, pulsing floor auras, boss orbit chevrons, device glows/screens/bubbles, and puff-synchronized impact rings without changing encounter health, input cadence, or rewards.
- Replaced global CSS skin filters with a bounded pose-aware recolor cache that changes only authored warm-fur pixels across neutral, run, jump, puff, and wardrobe frames while preserving eyes, muzzle, paws, nose, ink, tape, bandana, hats, and glasses.
- Extracted warm-fur classification and luminance-preserving palette math into a tested rendering module with protected-color regression coverage.
- Extracted a versioned save schema and guarded persistence adapter while retaining both historical browser keys. Existing saves migrate in place without changing progression, balance, cosmetics, mute state, or content mode.
- Added independent corrupt-current/valid-legacy recovery, numeric and upgrade repair, forward-field preservation, equipped-cosmetic retention, blocked-storage session fallback, and portable JSON backup download/restore controls in the wardrobe.
- Rebuilt the runtime city with inked silhouettes, brick texture, neon windows, fire escapes, cables, road damage, sprint streaks, and stronger lighting.
- Reworked burst particles into distinct dust, spark, hit, heal, and loot shapes.
- Verified the live build starts and runs at a mobile viewport without console warnings or errors.

## Validated

- `npm test`
- `npm run build`
- 568×320 launch layout
- 320×568 active encounter layout
- portrait-to-landscape rotation during an active encounter
- Original-to-candy switching during a paused active encounter
- Candy encounter clear and SPRINKLES reward flow
- Candy preference persistence across reload
- 844×390 Original and Candy encounter rendering with the revised character and prop layers
- 568×320 contact/gallop animation and short-landscape launch layout with optimized production assets
- 568×320 consecutive six-frame run samples plus takeoff, airborne, landing-recoil, and resumed-run samples
- 390×844 title and active encounter rendering with the generated character art
- 390×844 active run with the six-frame atlas and Little Baby Idiot Mode enabled
- 1280×720 active run with no browser warnings or errors
- 568×320 Original cigarette/cigar and Candy juice-box mouth attachment with no duplicate pedestal prop or browser errors
- 568×320 Original cigarette/vape action phases, repeated 115 ms puff stress test, idle recovery, and inked curl trails
- 568×320 live Original-to-Candy encounter switch with juice-box socket and outlined directional sprinkles
- 390×844 active Candy bite/recoil after viewport rotation with aligned prop, cosmetic, and mouth-effect sockets
- 390×844 live GitHub Pages start/run smoke test
- 568×320 generated hydrant and iridescent puddle at gameplay scale with clean alpha, stable ground anchors, unchanged UI clearance, and no runtime errors
- Source-atlas review for both aerial animation frames of the crow, bat, and drone plus deterministic PNG dimension, alpha, and byte-budget enforcement
- 568×320 animated closet preview with Tuxedo skin markings plus generated Heartbreakers/Traffic Cone King preview-only combination
- 390×844 animated closet preview and two-column cosmetic-card layout with generated 3D Disaster eyewear
- 568×320 Tuxedo run and airborne frames with restored markings and clean pose-local rendering
- Clean-browser wardrobe, preview, run, and ambient-motion smoke test with no warnings or errors
- Deterministic PNG dimension, alpha, mapping-completeness, pose-local-rendering, and byte-budget enforcement for both cosmetic atlases
- 568×320 live Candy chocolate-roll encounter, bite/recoil, and hot Original-mode cigar swap on the same mouth socket
- 390×844 Original cigar encounter with production device art, stable HUD/action-control clearance, and intact mouth attachment
- Source-atlas review plus deterministic dimensions, alpha-capable PNG format, complete 22-device mapping, burn-state hook, and byte budgets for both encounter atlases
- Animated wardrobe review of Calico, Blackout, Snowball, Neon, and Bone Cat extremes with preserved authored face details and unchanged cosmetic layers
- 568×320 Tuxedo run, jump, ready, and recoil frames plus 390×844 run/encounter coverage through the pose-aware palette cache
- Unit coverage proving ginger fur recolors while gold eyes, cream muzzle, pink nose, and black ink remain byte-identical
- Fourteen-test suite covering defaults, legacy migration, corrupt-current recovery, partial/hostile repair, future-field preservation, current-save stability, storage failure, and portable backup round trips
- Real existing-browser migration at 390×844 preserving 74 Ash, 294 m best, two air dodges, Tux ownership/equip state, and Original/Candy preference across repeated writes and reloads
- GitHub Pages build and deployment workflow

## Next milestone

Extract progression rules behind tests, then add developer encounter shortcuts and visual snapshots before calling the full boss/device matrix covered.

## Known limitations

- The production runtime is still mostly the original single-file implementation.
- Skin recoloring is pose-aware and selective, but patterns remain compact code-native overlays rather than authored texture layers for every pose.
- Encounter devices and sticks use production art; their loading fallback, gameplay-critical burn cues, collision-independent effects, hazard collision, and warning overlays intentionally remain code-native.
- Browser automation currently covers the highest-risk paths, not the full boss/cosmetic matrix.
- Portable backups are manual downloads; optional cloud synchronization is not part of the public-alpha scope.
- The public web alpha should not be described as mobile-store ready.
