# Production Status

Last updated: 2026-08-21 (America/New_York)

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
- 390×844 live GitHub Pages start/run smoke test
- GitHub Pages build and deployment workflow

## Next milestone

Finish the layered-character pipeline with explicit skin masks and pose-aligned cosmetic anchors, then replace the remaining procedural hazards and encounter devices using the same art direction. Save migration and progression extraction remain the next architecture targets.

## Known limitations

- The production runtime is still mostly the original single-file implementation.
- Non-default skin recoloring is still filter-based; dedicated per-pose masks are needed for a final cosmetic pipeline.
- Hazards and encounter props remain code-native and need the same production-art pass.
- Browser automation currently covers the highest-risk paths, not the full boss/cosmetic matrix.
- The public web alpha should not be described as mobile-store ready.
