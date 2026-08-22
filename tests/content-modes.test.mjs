import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CANDY_PRESENTATIONS,
  CONTENT_MODE,
  assertCompleteCandyRegistry,
  normalizeContentMode,
  presentEncounter,
  toggleContentMode,
} from '../src/content/content-modes.js';

const encounters = [
  ['sidewalkSpecial', 1, 1, null],
  ['mentholMissile', 1.08, 1.15, 'speed'],
  ['nurseFilter', 1.12, 1.1, 'heal'],
  ['ashJackpot', 1.18, 1.45, 'ash'],
  ['ghostFilter', 1.26, 1.3, 'ghost'],
  ['cigarilloBrick', 1.42, 1.5, 'healthup'],
  ['turboVape', 1.34, 1.35, 'combo'],
  ['vapeLord', 2.8, 2.8, 'bossGhost'],
  ['hookah', 3.1, 3.1, 'bossHeal'],
  ['bong', 3.35, 3.4, 'bossSpeed'],
  ['machine', 3.6, 3.8, 'bossAsh'],
].map(([id, hp, reward, effect]) => ({
  id,
  name: `ORIGINAL ${id}`,
  hp,
  reward,
  effect,
  boss: ['vapeLord', 'hookah', 'bong', 'machine'].includes(id),
}));

test('normalizes unknown and missing values to original mode', () => {
  assert.equal(normalizeContentMode(), CONTENT_MODE.ORIGINAL);
  assert.equal(normalizeContentMode('garbage'), CONTENT_MODE.ORIGINAL);
  assert.equal(normalizeContentMode(CONTENT_MODE.CANDY), CONTENT_MODE.CANDY);
});

test('toggle alternates only between supported modes', () => {
  assert.equal(toggleContentMode(CONTENT_MODE.ORIGINAL), CONTENT_MODE.CANDY);
  assert.equal(toggleContentMode(CONTENT_MODE.CANDY), CONTENT_MODE.ORIGINAL);
  assert.equal(toggleContentMode('garbage'), CONTENT_MODE.CANDY);
});

test('candy registry covers every canonical encounter', () => {
  assert.equal(Object.keys(CANDY_PRESENTATIONS).length, encounters.length);
  assert.equal(assertCompleteCandyRegistry(encounters), true);
});

test('presentation swaps display fields without changing mechanics', () => {
  for (const encounter of encounters) {
    const original = presentEncounter(encounter, CONTENT_MODE.ORIGINAL);
    const candy = presentEncounter(encounter, CONTENT_MODE.CANDY);

    assert.equal(original, encounter);
    assert.notEqual(candy.name, encounter.name);
    assert.equal(candy.id, encounter.id);
    assert.equal(candy.hp, encounter.hp);
    assert.equal(candy.reward, encounter.reward);
    assert.equal(candy.effect, encounter.effect);
    assert.equal(candy.boss, encounter.boss);
  }
});

test('unknown encounter ids fail open to canonical presentation', () => {
  const unknown = { id: 'futureThing', name: 'FUTURE THING', hp: 9 };
  assert.deepEqual(presentEncounter(unknown, CONTENT_MODE.CANDY), unknown);
});
