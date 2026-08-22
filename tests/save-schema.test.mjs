import test from 'node:test';
import assert from 'node:assert/strict';

import { CONTENT_MODE } from '../src/content/content-modes.js';
import {
  LEGACY_SAVE_KEY,
  SAVE_KEY,
  SAVE_VERSION,
  createDefaultSave,
  loadStoredSave,
  migrateSave,
  parseSaveBackup,
  serializeSaveBackup,
  writeStoredSave,
} from '../src/state/save-schema.js';

class MemoryStorage {
  constructor(entries = {}) {
    this.values = new Map(Object.entries(entries));
  }

  getItem(key) {
    return this.values.get(key) ?? null;
  }

  setItem(key, value) {
    this.values.set(key, value);
  }
}

test('creates independent versioned defaults', () => {
  const first = createDefaultSave();
  const second = createDefaultSave();
  first.up.combo = 4;
  first.cosmetics.unlocked.push('skin_tux');

  assert.equal(first.schemaVersion, SAVE_VERSION);
  assert.equal(second.up.combo, 0);
  assert.deepEqual(second.cosmetics.unlocked, ['skin_street', 'glasses_none', 'hat_none']);
});

test('migrates the legacy key without losing progression or presentation mode', () => {
  const legacy = {
    ash: 91.5,
    packs: 7,
    best: 812,
    smoked: 14,
    bosses: 2,
    contentMode: CONTENT_MODE.CANDY,
    up: { bigDrag: 4, combo: 3 },
    meta: { lungs: 2 },
    stats: { nearMisses: 11 },
    bossWins: { vapeLord: 1 },
    cosmetics: {
      unlocked: ['skin_tux', 'hat_beanie'],
      equipped: { skin: 'skin_tux', hat: 'hat_beanie' },
    },
  };
  const storage = new MemoryStorage({ [LEGACY_SAVE_KEY]: JSON.stringify(legacy) });
  const result = loadStoredSave(storage);

  assert.equal(result.source, 'legacy');
  assert.equal(result.needsWrite, true);
  assert.equal(result.save.ash, 91.5);
  assert.equal(result.save.best, 812);
  assert.equal(result.save.contentMode, CONTENT_MODE.CANDY);
  assert.equal(result.save.up.bigDrag, 4);
  assert.equal(result.save.meta.lungs, 2);
  assert.equal(result.save.stats.nearMisses, 11);
  assert.equal(result.save.bossWins.vapeLord, 1);
  assert.equal(result.save.cosmetics.equipped.skin, 'skin_tux');
  assert.ok(result.save.cosmetics.unlocked.includes('hat_beanie'));
});

test('falls back to a valid legacy save when the current JSON is corrupted', () => {
  const storage = new MemoryStorage({
    [SAVE_KEY]: '{broken',
    [LEGACY_SAVE_KEY]: JSON.stringify({ ash: 44, best: 260 }),
  });
  const result = loadStoredSave(storage);

  assert.equal(result.source, 'legacy');
  assert.equal(result.save.ash, 44);
  assert.equal(result.save.best, 260);
});

test('repairs partial and hostile values while preserving safe future fields', () => {
  const migrated = migrateSave({
    schemaVersion: 9,
    futureFlag: 'preserve-me',
    ash: -50,
    packs: '6',
    best: Number.NaN,
    up: { combo: 999, futureUpgrade: 2 },
    meta: null,
    stats: { nearMisses: -3 },
    bossWins: { machine: 2.9 },
    cosmetics: {
      unlocked: ['skin_tux', 'skin_tux', 42, 'x'.repeat(101)],
      equipped: { skin: 'skin_tux', glasses: 'bad-id', hat: 'hat_crown' },
    },
    muted: 'yes',
  });

  assert.equal(migrated.schemaVersion, 9);
  assert.equal(migrated.futureFlag, 'preserve-me');
  assert.equal(migrated.ash, 0);
  assert.equal(migrated.packs, 6);
  assert.equal(migrated.best, 0);
  assert.equal(migrated.up.combo, 8);
  assert.equal(migrated.up.futureUpgrade, 2);
  assert.equal(migrated.stats.nearMisses, 0);
  assert.equal(migrated.bossWins.machine, 2);
  assert.equal(migrated.muted, false);
  assert.deepEqual(migrated.cosmetics.equipped, {
    skin: 'skin_tux',
    glasses: 'glasses_none',
    hat: 'hat_crown',
  });
  assert.ok(migrated.cosmetics.unlocked.includes('skin_tux'));
  assert.ok(migrated.cosmetics.unlocked.includes('hat_crown'));
});

test('writes a migrated current save and reports storage failures', () => {
  const storage = new MemoryStorage();
  assert.equal(writeStoredSave(storage, { ash: 12, cosmetics: { equipped: { skin: 'skin_tux' } } }), true);
  const stored = JSON.parse(storage.getItem(SAVE_KEY));
  assert.equal(stored.schemaVersion, SAVE_VERSION);
  assert.equal(stored.ash, 12);
  assert.equal(stored.cosmetics.equipped.skin, 'skin_tux');
  assert.ok(stored.cosmetics.unlocked.includes('skin_tux'));

  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(loadStoredSave(blocked).source, 'defaults');
  assert.equal(writeStoredSave(blocked, stored), false);
});

test('recognizes an up-to-date current save without rewriting it', () => {
  const current = createDefaultSave();
  current.ash = 33;
  const result = loadStoredSave(new MemoryStorage({ [SAVE_KEY]: JSON.stringify(current) }));

  assert.equal(result.source, 'current');
  assert.equal(result.needsWrite, false);
  assert.equal(result.save.ash, 33);
});

test('round-trips portable backups and rejects unrelated JSON', () => {
  const save = createDefaultSave();
  save.best = 902;
  save.contentMode = CONTENT_MODE.CANDY;
  save.cosmetics.unlocked.push('glasses_heart');
  save.cosmetics.equipped.glasses = 'glasses_heart';

  const restored = parseSaveBackup(serializeSaveBackup(save));
  assert.equal(restored.best, 902);
  assert.equal(restored.contentMode, CONTENT_MODE.CANDY);
  assert.equal(restored.cosmetics.equipped.glasses, 'glasses_heart');
  assert.throws(() => parseSaveBackup('{broken'), /valid JSON/);
  assert.throws(() => parseSaveBackup('{"hello":"world"}'), /does not look/);
  assert.throws(() => parseSaveBackup('[]'), /save object/);
});
