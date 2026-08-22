# Product Decisions

## Confirmed direction

| Decision | Selection | Consequence |
| --- | --- | --- |
| Repository | Public GitHub repository | Source and history are visible to everyone. |
| Initial distribution | Web-first GitHub Pages alpha | Friends can playtest from a URL without installation. |
| Creative identity | Preserve the tobacco-themed original | Mobile-store acceptance is not an initial launch requirement. |
| Portability | Keep simulation, input actions, content, saves, and rendering boundaries separable | A later Capacitor wrapper or native-engine port does not require redesigning game rules. |
| Alternate presentation | Add Little Baby Idiot Mode | Players may swap tobacco presentation for a candy content skin without changing mechanics. |
| Save durability | Versioned local schema plus portable JSON backup | Existing browser progress migrates in place, corrupted current data may recover from the legacy key, and players can keep a copy outside browser storage. |
| Playtest tooling | Explicit `?playtest=1` session-only lab | Testers can reach bosses, modes, and cosmetics instantly without writing cheats or test progress into the real browser save. |

## Distribution policy position

The public alpha is a web release. The project will not describe itself as App Store or Google Play ready while tobacco consumption remains a rewarded core presentation.

Little Baby Idiot Mode does not, by itself, make the same binary suitable for mobile stores. A store-oriented release would require a separate policy review and may require candy presentation to be the only/default presentation in the binary, store listing, screenshots, metadata, achievements, and marketing.

## Mobile-port preparation

The web build will prepare for a future port by:

- avoiding browser-global game rules;
- representing input as actions rather than DOM events;
- separating fixed-step simulation from rendering;
- keeping display names and visuals in content packs;
- versioning saves and isolating persistence adapters;
- keeping audio lifecycle controls explicit;
- respecting safe areas, suspension, focus loss, and orientation changes;
- using asset manifests rather than hard-coded filesystem assumptions.

## Visual-production position

Generated imagery is appropriate for concept boards, character references, backgrounds, prop exploration, and marketing art. Final UI, typography, collision shapes, and timing-sensitive animated VFX stay code-native. Final character assets should be layered and derived from one approved reference so animation and cosmetics remain consistent.

## Rights and branding

- No open-source license is granted until the owner chooses one.
- All generated and third-party assets must receive a source/provenance entry before shipping.
- Real-world brand references, including the current “Lucky Strike” upgrade name, require removal, replacement, or explicit clearance before a broader public launch.
