import { CONTENT_MODE, normalizeContentMode } from '../content/content-modes.js';

export const SAVE_VERSION = 2;
export const SAVE_KEY = 'smokeBreakCat_overdrive_v1';
export const LEGACY_SAVE_KEY = 'smokeBreakCat_v1';

const LEVEL_CAPS = {
  up: { autoPuff: 10, deepIdle: 8, hotStart: 5, bigDrag: 10, crit: 8, combo: 8 },
  meta: { lungs: 3, scavenger: 5, weird: 5 },
};

const COUNTER_KEYS = ['ash', 'packs', 'best', 'smoked', 'bosses', 'runs'];
const STAT_KEYS = ['boxesOpened', 'nearMisses', 'sprintNearMisses', 'ghostTrips', 'cosmeticFinds', 'totalDistance'];
const BOSS_KEYS = ['vapeLord', 'hookah', 'bong', 'machine'];
const STARTER_COSMETICS = ['skin_street', 'glasses_none', 'hat_none'];
const DEFAULT_EQUIPPED = { skin: 'skin_street', glasses: 'glasses_none', hat: 'hat_none' };

function objectOrEmpty(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function safeNumber(value, fallback = 0, { integer = false, max = Number.MAX_SAFE_INTEGER } = {}) {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(number)) return fallback;
  const normalized = Math.max(0, Math.min(max, number));
  return integer ? Math.floor(normalized) : normalized;
}

function safeCosmeticId(value, prefix, fallback) {
  return typeof value === 'string' && value.startsWith(prefix) && value.length <= 100 ? value : fallback;
}

export function createDefaultSave() {
  return {
    schemaVersion: SAVE_VERSION,
    ash: 0,
    packs: 0,
    best: 0,
    smoked: 0,
    bosses: 0,
    runs: 0,
    contentMode: CONTENT_MODE.ORIGINAL,
    up: { autoPuff: 0, deepIdle: 0, hotStart: 0, bigDrag: 0, crit: 0, combo: 0 },
    meta: { lungs: 0, scavenger: 0, weird: 0 },
    stats: { boxesOpened: 0, nearMisses: 0, sprintNearMisses: 0, ghostTrips: 0, cosmeticFinds: 0, totalDistance: 0 },
    bossWins: { vapeLord: 0, hookah: 0, bong: 0, machine: 0 },
    cosmetics: { unlocked: [...STARTER_COSMETICS], equipped: { ...DEFAULT_EQUIPPED } },
    muted: false,
  };
}

export function migrateSave(input) {
  const defaults = createDefaultSave();
  const raw = objectOrEmpty(input);
  const up = objectOrEmpty(raw.up);
  const meta = objectOrEmpty(raw.meta);
  const stats = objectOrEmpty(raw.stats);
  const bossWins = objectOrEmpty(raw.bossWins);
  const cosmetics = objectOrEmpty(raw.cosmetics);
  const equippedRaw = objectOrEmpty(cosmetics.equipped);

  const migrated = {
    ...raw,
    ...defaults,
    schemaVersion: Math.max(SAVE_VERSION, safeNumber(raw.schemaVersion, 0, { integer: true })),
    contentMode: normalizeContentMode(raw.contentMode),
    up: { ...up },
    meta: { ...meta },
    stats: { ...stats },
    bossWins: { ...bossWins },
    muted: typeof raw.muted === 'boolean' ? raw.muted : defaults.muted,
  };

  for (const key of COUNTER_KEYS) migrated[key] = safeNumber(raw[key], defaults[key], { integer: key !== 'ash' });
  for (const [key, cap] of Object.entries(LEVEL_CAPS.up)) migrated.up[key] = safeNumber(up[key], 0, { integer: true, max: cap });
  for (const [key, cap] of Object.entries(LEVEL_CAPS.meta)) migrated.meta[key] = safeNumber(meta[key], 0, { integer: true, max: cap });
  for (const key of STAT_KEYS) migrated.stats[key] = safeNumber(stats[key], 0, { integer: true });
  for (const key of BOSS_KEYS) migrated.bossWins[key] = safeNumber(bossWins[key], 0, { integer: true });

  const equipped = {
    skin: safeCosmeticId(equippedRaw.skin, 'skin_', DEFAULT_EQUIPPED.skin),
    glasses: safeCosmeticId(equippedRaw.glasses, 'glasses_', DEFAULT_EQUIPPED.glasses),
    hat: safeCosmeticId(equippedRaw.hat, 'hat_', DEFAULT_EQUIPPED.hat),
  };
  const unlockedInput = Array.isArray(cosmetics.unlocked) ? cosmetics.unlocked : [];
  const unlocked = [...new Set([
    ...STARTER_COSMETICS,
    ...unlockedInput.filter((id) => typeof id === 'string' && id.length <= 100),
    ...Object.values(equipped),
  ])];
  migrated.cosmetics = { ...cosmetics, unlocked, equipped };

  return migrated;
}

function readJson(storage, key) {
  if (!storage) return null;
  try {
    const value = storage.getItem(key);
    if (!value) return null;
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function loadStoredSave(storage) {
  const current = readJson(storage, SAVE_KEY);
  const legacy = current ? null : readJson(storage, LEGACY_SAVE_KEY);
  const source = current ? 'current' : legacy ? 'legacy' : 'defaults';
  const raw = current || legacy || {};
  return {
    save: migrateSave(raw),
    source,
    needsWrite: source !== 'current' || safeNumber(raw.schemaVersion, 0, { integer: true }) < SAVE_VERSION,
  };
}

export function writeStoredSave(storage, save) {
  if (!storage) return false;
  try {
    storage.setItem(SAVE_KEY, JSON.stringify(migrateSave(save)));
    return true;
  } catch {
    return false;
  }
}

export function serializeSaveBackup(save) {
  return JSON.stringify(migrateSave(save), null, 2);
}

export function parseSaveBackup(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Backup is not valid JSON');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Backup must contain a save object');
  const recognized = ['schemaVersion', 'ash', 'packs', 'best', 'up', 'meta', 'stats', 'bossWins', 'cosmetics'];
  if (!recognized.some((key) => key in parsed)) throw new Error('Backup does not look like a Smoke Break Cat save');
  return migrateSave(parsed);
}
