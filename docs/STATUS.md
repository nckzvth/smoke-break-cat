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
- Rejected and removed the generated-raster direction, including eleven character, cosmetic, hazard, loot, and Original/Candy encounter atlases plus the obsolete generated concept board.
- Restored the prototype's thick-ink canvas identity as the shipping source of truth and documented it in `docs/CODE_NATIVE_ART.md`.
- Added one shared horizontal street-gremlin mascot renderer for the title, gameplay, encounter, and wardrobe surfaces, with hostile eyes, bandana, snaggletooth, question-mark tail, run gait, sprint lean, airborne tilt, and puff recoil.
- Attached every encounter prop to the cat's mouth through per-device sockets, moved puff/confetti emission to the mouth, and removed the duplicate encounter-pedestal prop.
- Restored code-native ground hazards, flying hazards, loot, and all 22 Original/Candy encounter props while preserving their animation, gameplay geometry, warning, burn, reward, and mode-parity contracts.
- Rebuilt all twelve skins as pattern/color treatments of the same mascot and all twenty-two equippables as bold code-drawn head-local layers.
- Added an animated closet loadout preview with safe preview-only handling for locked items and immediate persistent equip behavior for owned items.
- Added overt non-character motion to neon signs, windows, moon glow, overhead wires, street steam, every ground-hazard class, aerial threat details, loot, and Original/Candy encounter devices.
- Added encounter focus lighting, pulsing floor auras, boss orbit chevrons, device glows/screens/bubbles, and puff-synchronized impact rings without changing encounter health, input cadence, or rewards.
- Removed the obsolete raster recoloring cache; skins now render directly from their authored palette and pattern data.
- Replaced the unapproved real-world “Lucky Strike” reference with the fictional “Lucky Rip” upgrade name.
- Extracted a versioned save schema and guarded persistence adapter while retaining both historical browser keys. Existing saves migrate in place without changing progression, balance, cosmetics, mute state, or content mode.
- Added independent corrupt-current/valid-legacy recovery, numeric and upgrade repair, forward-field preservation, equipped-cosmetic retention, blocked-storage session fallback, and portable JSON backup download/restore controls in the wardrobe.
- Extracted upgrade costs/caps, player power, combo behavior, encounter health/rewards, boss cadence, loot boundaries, and cosmetic unlock conditions into one deterministic progression module without changing shipped balance.
- Added a query-gated, session-only playtest lab that reaches every boss, cycles street encounters, switches presentation modes, grants temporary PACKS, restores health, and unlocks the full wardrobe without writing to the player's real browser save.
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
- 390×844 Gremlin Cut title mascot, Original Vape Lord encounter, puff recoil, mouth attachment, and inked smoke curl rendering
- 390×844 normal-URL run and airborne states with the shared code-native Tuxedo mascot and no playtest controls
- 390×844 animated wardrobe preview with the code-native Hell Tiger, Laser Visor, and Traffic Cone King stress loadout
- 1280×720 active run with no browser warnings or errors
- 568×320 Original cigarette/cigar and Candy juice-box mouth attachment with no duplicate pedestal prop or browser errors
- 568×320 Original cigarette/vape action phases, repeated 115 ms puff stress test, idle recovery, and inked curl trails
- 568×320 live Original-to-Candy encounter switch with juice-box socket and outlined directional sprinkles
- 390×844 active Candy bite/recoil after viewport rotation with aligned prop, cosmetic, and mouth-effect sockets
- 390×844 live GitHub Pages start/run smoke test
- Code-native hydrant, puddle, pigeon, can, cone, crow, bat, drone, and loot fallback rendering with unchanged gameplay geometry
- Shared title/gameplay/wardrobe mascot contract and complete twelve-skin/twenty-two-equippable no-throw coverage
- Clean-browser wardrobe, preview, run, and ambient-motion smoke test with no warnings or errors
- 568×320 live Candy chocolate-roll encounter, bite/recoil, and hot Original-mode cigar swap on the same mouth socket
- 390×844 Original cigar and boss-device encounters with code-native art, stable HUD/action-control clearance, and intact mouth attachment
- Twenty-two Original/Candy device variants remain complete, burn-aware where applicable, and mechanically identical
- Twenty-two-test suite covering the shared code-art system, progression parity, loot boundaries, boss cadence, unlock evaluation, defaults, legacy migration, corrupt-current recovery, partial/hostile repair, future-field preservation, current-save stability, storage failure, and portable backup round trips
- Real existing-browser migration at 390×844 preserving 74 Ash, 294 m best, two air dodges, Tux ownership/equip state, and Original/Candy preference across repeated writes and reloads
- Query-gated lab entry and complete control layout at 390×844, plus immediate Original Vape Lord and Candy Candy Crusher boss loads with correct real encounter tiers
- Candy Cursed Sundae and Phantom Gumball Machine boss/device rendering at 568×320, including corrected long-name, toast, health-meter, and lab-control clearance
- Session-only unlock-all cosmetic preview with Hell Tiger, Laser Visor, and Traffic Cone King, plus a separate normal-URL reload proving temporary Candy mode, PACKS, and unlock mutations did not persist
- GitHub Pages build and deployment workflow

## Next milestone

Add automated visual snapshot baselines and broader gameplay state-transition coverage, then profile maximum-effects frame pacing on target phones.

## Known limitations

- The production runtime is still mostly the original single-file implementation.
- The Gremlin Cut intentionally favors bold code-drawn shapes over frame-heavy animation; additional gait and expression poses can still deepen the character without changing its silhouette.
- Visual snapshot comparison remains manual rather than pixel-diff automated.
- The lab makes the full boss/cosmetic matrix reachable without grinding, but browser snapshot comparison is still manual rather than pixel-diff automated.
- Portable backups are manual downloads; optional cloud synchronization is not part of the public-alpha scope.
- The public web alpha should not be described as mobile-store ready.
