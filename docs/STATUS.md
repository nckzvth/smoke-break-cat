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
- Verified the live build starts and runs at a mobile viewport without console warnings or errors.

## Validated

- `npm test`
- `npm run build`
- 568×320 launch layout
- 320×568 active encounter layout
- portrait-to-landscape rotation during an active encounter
- 390×844 live GitHub Pages start/run smoke test
- GitHub Pages build and deployment workflow

## Next milestone

Extract the single-file runtime into testable modules while preserving current balance and existing local saves. The first extraction targets are content data, save handling, and pure progression calculations because they unlock deterministic tests and the two-mode content registry with the least gameplay risk.

## Known limitations

- The production runtime is still mostly the original single-file implementation.
- Little Baby Idiot Mode is specified but not implemented.
- Visuals remain prototype-grade pending the art-direction and asset-production milestone.
- Browser automation currently covers the highest-risk paths, not the full boss/cosmetic matrix.
- The public web alpha should not be described as mobile-store ready.
