# Smoke Break Cat Production Plan

## Objective

Turn the playable prototype into a reliable public web alpha on GitHub Pages, then evolve it into a studio-grade codebase without sacrificing the game's tone or making a future mobile port unnecessarily expensive.

## Current status

- Milestone 0 is complete.
- The first Milestone 1 foundation is deployed at `https://nckzvth.github.io/smoke-break-cat/`.
- Build, validation, continuous integration, and Pages deployment workflows are installed.
- The confirmed compact-layout and mid-encounter rotation blockers are repaired in the production entry point.
- The first extracted module now owns the tested two-mode presentation registry, and Little Baby Idiot Mode covers every current encounter.
- A generated character/VFX direction board defines the target silhouette, palette, layering, and effects language; identity-locked character cycles plus production hazard, loot, eyewear, hat, and paired Original/Candy encounter-device atlases now implement that direction in the runtime.
- Full modularization, broader automated gameplay coverage, accessibility work, and visual production remain active roadmap items.
- The visual-overhaul slice now covers the hero, run/action animation, hazards, loot, cosmetics, environment motion, encounter staging, and every encounter prop; dedicated per-pose skin masks are the remaining major sprite-pipeline gap.

## Non-negotiable launch gates

- The repository root builds and serves a valid `index.html`.
- Compact portrait, compact landscape, and orientation changes remain playable.
- No blocking or high-severity runtime findings remain.
- Existing local progress migrates without loss.
- Automated checks cover the core run, encounter, reward, death, retry, shop, wardrobe, and save flows.
- The live GitHub Pages build is smoke-tested after deployment.
- Original Mode and Little Baby Idiot Mode use the same game rules and save economy.

## Milestone 0 — Preserve and publish the prototype

Deliverables:

- Initialize Git and create the public `nckzvth/smoke-break-cat` repository.
- Preserve the original HTML artifact unchanged.
- Add project documentation and an explicit alpha status.
- Establish `main` as the stable branch and use `codex/*` branches for implementation work.

Exit criteria:

- Baseline source is committed and recoverable.
- Repository ownership, visibility, and product direction are documented.

## Milestone 1 — Production web foundation

Deliverables:

- Add Vite with a real root `index.html` and relative asset paths suitable for GitHub Pages.
- Add deterministic build, preview, syntax, and smoke-test commands.
- Add GitHub Actions for continuous integration and Pages deployment.
- Add favicon, web manifest, social metadata, `.nojekyll`, and a useful `404.html`.
- Fix the confirmed orientation and compact-viewport blockers before the first public deployment.

Exit criteria:

- `npm run build` succeeds from a clean checkout.
- CI passes on `main`.
- The Pages URL loads the game rather than a directory listing.
- 320×568, 390×844, 568×320, 844×390, and desktop smoke tests pass.

## Milestone 2 — Modularize without changing balance

Deliverables:

- Extract game state, loop, collisions, encounters, progression, saves, audio, input, rendering, UI, and content data into modules.
- Introduce seeded randomness for deterministic tests while preserving normal randomized play.
- Separate game rules from presentation so both content modes and future renderers use the same simulation.
- Keep the current save key readable and add a versioned schema.

Exit criteria:

- Core balance values match the prototype unless a change is explicitly documented.
- Old saves load in automated migration tests.
- Rendering and content-mode selection do not alter rewards, collision timing, or unlock rules.

## Milestone 3 — Mobile-ready interaction and accessibility

Deliverables:

- Add a formal pause/settings surface.
- Normalize pointer, touch, mouse, keyboard, visibility, and focus behavior.
- Add safe-area handling, reduced motion, zoom support, descriptive labels, keyboard focus, and readable non-canvas status.
- Define an input-action abstraction suitable for later gamepad and native touch bindings.
- Add save export/import and graceful storage-failure handling.

Exit criteria:

- The game remains usable across supported viewport and input combinations.
- Important state is not conveyed only through inaccessible canvas pixels.
- Losing browser storage is no longer the only recovery story.

## Milestone 4 — Visual identity overhaul

Deliverables:

- Approve one art-direction board before producing final assets.
- Use generated raster art for concept exploration, character references, environmental plates, props, and marketing art.
- Build final characters as layered, reusable assets so skins, glasses, hats, animation, and content modes remain consistent.
- Keep UI, typography, collision geometry, and most animated VFX deterministic and code-native.
- Replace placeholder-feeling character rendering, backgrounds, smoke devices, enemies, impacts, smoke, sparks, dust, motion streaks, and encounter staging.

Exit criteria:

- Character silhouettes and hazards remain readable at phone scale.
- Animation and cosmetics remain consistent across all frames.
- Effects improve impact without obscuring collision-critical information.
- Every shipped asset has a recorded source and usage status.

## Milestone 5 — Content, balance, and full regression coverage

Deliverables:

- Add unit tests for costs, rewards, bosses, unlocks, save migration, and content mappings.
- Add end-to-end coverage for every major state transition.
- Add developer shortcuts for testing bosses, cosmetics, rewards, and late-game districts.
- Perform balance passes using recorded run data rather than intuition alone.
- Add performance budgets and visual regression snapshots.

Exit criteria:

- All bosses and cosmetics can be validated without manual grinding.
- No known soft locks, progression dead ends, or mode-specific economy changes remain.
- Target phones sustain acceptable frame pacing during maximum effects.

## Milestone 6 — Public-alpha operations

Deliverables:

- Add content notice, privacy statement, credits, support path, changelog, release notes, and rollback instructions.
- Remove or replace unapproved third-party brand references.
- Tag releases and publish only validated commits from `main`.
- Monitor Pages deployments and keep the last known-good build recoverable.

Exit criteria:

- The live build matches the tested commit.
- Deployment, rollback, support, and known-issue procedures are documented.
- A fresh browser and an upgraded existing browser both pass launch smoke tests.

## Planned production structure

```text
src/
  main.js
  game/
  rendering/
  systems/
  data/
  ui/
  styles/
public/
  assets/
tests/
  unit/
  e2e/
docs/
.github/workflows/
```

## Deployment model

- Pull requests run checks but do not replace production.
- Merges to protected `main` build and deploy through GitHub Actions.
- The expected project URL is `https://nckzvth.github.io/smoke-break-cat/`.
- A custom domain can be introduced after the alpha proves stable.
