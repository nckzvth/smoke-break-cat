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
- Reworked the runtime cat silhouette, face, paws, encounter arm, and burst particles as the first code-native translation of that direction.
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
- 390×844 live GitHub Pages start/run smoke test
- GitHub Pages build and deployment workflow

## Next milestone

Continue extracting the single-file runtime into testable modules while preserving current balance and existing local saves. The next targets are save migration and pure progression calculations, followed by deterministic run-state tests.

## Known limitations

- The production runtime is still mostly the original single-file implementation.
- Visuals remain prototype-grade pending the art-direction and asset-production milestone.
- Browser automation currently covers the highest-risk paths, not the full boss/cosmetic matrix.
- The public web alpha should not be described as mobile-store ready.
