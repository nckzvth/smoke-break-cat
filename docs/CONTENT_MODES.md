# Content-Mode Contract

## Purpose

Content modes change names, descriptions, sprites, encounter artwork, particles, sound flavor, and jokes. They must never change hit points, timing, rewards, rarity, collision boxes, progression, achievements, save economy, or input behavior.

## Modes

### Original Mode

The intended default for the web alpha. It preserves the cigarettes, filters, vapes, cigars, hookahs, bongs, smoke effects, and original jokes.

### Little Baby Idiot Mode

An optional candy-themed content skin with deliberately unserious framing. The setting is saved as a user preference and can be changed without restarting progression.

Working encounter mapping:

| Original | Candy presentation |
| --- | --- |
| Sidewalk Special | Sidewalk Sugar Stick |
| Menthol Missile | Minty Missile |
| Nurse Filter | Strawberry Wafer |
| Ash Jackpot | Honeycomb Jackpot |
| Ghost Filter | Phantom Sour Belt |
| Cigarillo Brick | Chocolate Brick |
| Turbo Vape | Turbo Juice Box |
| The Vape Lord | The Soda Jerk |
| Cursed Hookah | Cursed Sundae |
| Phantom Bong | Phantom Gumball Machine |
| Chainsmoker 3000 | Candy Crusher 3000 |

Names are working copy and may change during the tone pass.

## Technical requirements

- Store a stable mode identifier such as `original` or `candy`; never store presentation text as game state.
- Resolve presentation through a content registry keyed by the existing encounter ID.
- Keep one canonical balance definition per encounter.
- Provide complete mapping tests so no tobacco asset or label leaks into candy mode.
- Cosmetics shared by both modes retain the same ownership IDs.
- Save migration defaults existing players to Original Mode and never resets progression.
- Analytics or playtest logging, if later added, may record the mode but must not create different reward tables.

## UX requirements

- Put the toggle in Settings and make its effect explicit before applying it.
- Preserve the exact label **Little Baby Idiot Mode** unless the owner changes it.
- Use a short explanation: “Turns the smoke gear into candy. Same game, same balance, less cool.”
- Do not present the toggle as medical advice, an age gate, or a guarantee of store-policy compliance.
