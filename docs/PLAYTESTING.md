# Playtesting Guide

## Public builds

- Normal game: https://nckzvth.github.io/smoke-break-cat/
- Session-only lab: https://nckzvth.github.io/smoke-break-cat/?playtest=1

The lab is deliberately query-gated and hidden on the normal URL. While `playtest=1` is active, all save writes are disabled: PACKS, unlocks, boss wins, mode changes, purchases, and run progress last only until the tab reloads. The player's real browser save is loaded as the starting point but is never overwritten by that lab session.

## Lab controls

Open **PLAYTEST LAB** below the normal top-right controls. The panel can:

- launch each of the four bosses immediately at its real encounter tier;
- cycle through all seven street encounters;
- switch between Original and Little Baby Idiot presentation modes;
- grant 10 temporary PACKS;
- restore full health;
- temporarily unlock every cosmetic and equip a deliberately extreme test loadout.

Launching an encounter hides the panel so the device, mouth socket, character, VFX, HUD, and action control can be reviewed without obstruction. Reopen the lab to select the next case.

## Visual matrix

For a release candidate, inspect all four bosses in both modes at minimum in:

- 390×844 portrait;
- 568×320 compact landscape;
- a desktop viewport.

For each case, check the ready pose, rapid input/recoil, mouth attachment, device burn state, phase changes, cosmetic alignment, effect readability, and HUD/action-button clearance. Also open the closet after **UNLOCK ALL COSMETICS** and exercise contrasting skin, glasses, and hat combinations.

## Exit and save safety

Remove `?playtest=1` or open the normal game URL to return to persistent play. Reloading a lab tab discards every lab mutation. Portable save backup and restore remain available in the closet, but a restore performed inside the lab is also session-only.
