import test from 'node:test';
import assert from 'node:assert/strict';

import {
  UPGRADE_RULES,
  baseMaxHearts,
  bossIndexForEncounter,
  bossPackReward,
  boxAshReward,
  boxRewardFromRoll,
  criticalChance,
  currentLevel,
  encounterAshReward,
  encounterMaxHp,
  hotStartRatio,
  meetsUnlockCondition,
  nextComboMultiplier,
  passiveDps,
  progressionValue,
  streetEncounterIndex,
  tapPower,
  upgradeCost,
} from '../src/game/progression.js';

function saveWith({ up = {}, meta = {}, stats = {}, bossWins = {}, ...root } = {}) {
  return {
    best: 0,
    smoked: 0,
    bosses: 0,
    runs: 0,
    up: { autoPuff: 0, deepIdle: 0, hotStart: 0, bigDrag: 0, crit: 0, combo: 0, ...up },
    meta: { lungs: 0, scavenger: 0, weird: 0, ...meta },
    stats: { boxesOpened: 0, nearMisses: 0, ...stats },
    bossWins: { vapeLord: 0, hookah: 0, bong: 0, machine: 0, ...bossWins },
    ...root,
  };
}

test('pins upgrade categories, caps, and exponential costs', () => {
  const save = saveWith({ up: { autoPuff: 2 }, meta: { lungs: 1 } });

  assert.equal(Object.keys(UPGRADE_RULES).length, 9);
  assert.equal(UPGRADE_RULES.autoPuff.max, 10);
  assert.equal(UPGRADE_RULES.lungs.category, 'meta');
  assert.equal(currentLevel(save, 'autoPuff'), 2);
  assert.equal(currentLevel(save, 'lungs'), 1);
  assert.equal(currentLevel(save, 'missing'), 0);
  assert.equal(upgradeCost(saveWith(), 'autoPuff'), 6);
  assert.equal(upgradeCost(saveWith({ up: { autoPuff: 1 } }), 'autoPuff'), 10);
  assert.equal(upgradeCost(save, 'autoPuff'), 17);
  assert.equal(upgradeCost(save, 'lungs'), 5);
  assert.equal(upgradeCost(save, 'missing'), Number.POSITIVE_INFINITY);
});

test('pins player power and heart progression', () => {
  const save = saveWith({
    up: { autoPuff: 2, deepIdle: 3, hotStart: 5, bigDrag: 4, crit: 8 },
    meta: { lungs: 2 },
  });

  assert.equal(baseMaxHearts(save), 5);
  assert.equal(hotStartRatio(save), 0.3);
  assert.equal(passiveDps(save), 3.28);
  assert.equal(tapPower(save), 6.8);
  assert.equal(criticalChance(save), 0.36);
});

test('pins combo growth, cap, and miss decay', () => {
  assert.equal(nextComboMultiplier(1, 4, true), 1.102);
  assert.equal(nextComboMultiplier(1.7, 4, true), 1.72);
  assert.equal(nextComboMultiplier(1.5, 4, false), 1.08);
  assert.equal(nextComboMultiplier(1.1, 0, true), 1);
});

test('pins encounter health, ash, and boss pack rewards', () => {
  assert.ok(Math.abs(encounterMaxHp({ encounters: 5, distance: 875, hpMultiplier: 2.8, boss: true }) - 620.655) < 1e-9);
  assert.equal(encounterMaxHp({ encounters: 2, distance: 10_000, hpMultiplier: 1.2, boss: false }), 298.8);
  assert.equal(encounterAshReward({
    encounters: 5,
    distance: 400,
    rewardMultiplier: 1.45,
    ashMultiplier: 1.35,
    scavengerLevel: 5,
    bonusAsh: true,
  }), 95);
  assert.equal(bossPackReward(5), 1);
  assert.equal(bossPackReward(10), 2);
  assert.equal(bossPackReward(20), 2);
});

test('pins loot reward boundaries and ash scaling', () => {
  assert.equal(boxAshReward(0, 0), 14);
  assert.equal(boxAshReward(1, 5), 45);
  assert.equal(boxRewardFromRoll(0.044, 0, true), 'cosmetic');
  assert.equal(boxRewardFromRoll(0.045, 0, true), 'ash');
  assert.equal(boxRewardFromRoll(0.259, 0, false), 'ash');
  assert.equal(boxRewardFromRoll(0.26, 0, false), 'heart');
  assert.equal(boxRewardFromRoll(0.42, 0, false), 'speed');
  assert.equal(boxRewardFromRoll(0.57, 0, false), 'ghost');
  assert.equal(boxRewardFromRoll(0.68, 0, false), 'empty');
});

test('pins deterministic encounter selection helpers', () => {
  assert.equal(bossIndexForEncounter(4, 4), -1);
  assert.equal(bossIndexForEncounter(5, 4), 0);
  assert.equal(bossIndexForEncounter(10, 4), 1);
  assert.equal(bossIndexForEncounter(20, 4), 3);
  assert.equal(bossIndexForEncounter(25, 4), 0);
  assert.equal(streetEncounterIndex(0, 7), 0);
  assert.equal(streetEncounterIndex(0.999, 7), 6);
  assert.equal(streetEncounterIndex(1, 7), 6);
  assert.equal(streetEncounterIndex(-2, 7), 0);
});

test('evaluates cosmetic unlock sources from root, stats, and boss wins', () => {
  const save = saveWith({ best: 300, stats: { boxesOpened: 8 }, bossWins: { hookah: 1 } });

  assert.equal(progressionValue(save, 'best'), 300);
  assert.equal(progressionValue(save, 'boxesOpened'), 8);
  assert.equal(meetsUnlockCondition(save, { type: 'default' }), true);
  assert.equal(meetsUnlockCondition(save, { type: 'stat', stat: 'best', value: 250 }), true);
  assert.equal(meetsUnlockCondition(save, { type: 'stat', stat: 'boxesOpened', value: 9 }), false);
  assert.equal(meetsUnlockCondition(save, { type: 'boss', boss: 'hookah', count: 1 }), true);
  assert.equal(meetsUnlockCondition(save, { type: 'find' }), false);
});
