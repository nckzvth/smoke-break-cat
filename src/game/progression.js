export const UPGRADE_RULES = Object.freeze({
  autoPuff: { category: 'up', kind: 'ash', max: 10, base: 6, scale: 1.65 },
  deepIdle: { category: 'up', kind: 'ash', max: 8, base: 18, scale: 1.8 },
  hotStart: { category: 'up', kind: 'ash', max: 5, base: 28, scale: 2.05 },
  bigDrag: { category: 'up', kind: 'ash', max: 10, base: 5, scale: 1.6 },
  crit: { category: 'up', kind: 'ash', max: 8, base: 20, scale: 1.85 },
  combo: { category: 'up', kind: 'ash', max: 8, base: 22, scale: 1.85 },
  lungs: { category: 'meta', kind: 'packs', max: 3, base: 2, scale: 2.1 },
  scavenger: { category: 'meta', kind: 'packs', max: 5, base: 2, scale: 1.9 },
  weird: { category: 'meta', kind: 'packs', max: 5, base: 1, scale: 2.2 },
});

export function currentLevel(save, key) {
  const rule = UPGRADE_RULES[key];
  return rule ? save?.[rule.category]?.[key] ?? 0 : 0;
}

export function upgradeCost(save, key) {
  const rule = UPGRADE_RULES[key];
  if (!rule) return Number.POSITIVE_INFINITY;
  return Math.ceil(rule.base * Math.pow(rule.scale, currentLevel(save, key)));
}

export function baseMaxHearts(save) {
  return 3 + currentLevel(save, 'lungs');
}

export function hotStartRatio(save) {
  return Math.min(0.3, currentLevel(save, 'hotStart') * 0.06);
}

export function passiveDps(save) {
  const base = currentLevel(save, 'autoPuff') * 0.8;
  return base * (1 + currentLevel(save, 'deepIdle') * 0.35);
}

export function tapPower(save) {
  return 2.2 + currentLevel(save, 'bigDrag') * 1.15;
}

export function criticalChance(save) {
  return currentLevel(save, 'crit') * 0.045;
}

export function nextComboMultiplier(current, level, recent) {
  if (!recent || level <= 0) return Math.max(1, current * 0.72);
  return Math.min(1 + level * 0.18, current + 0.07 + level * 0.008);
}

export function encounterMaxHp({ encounters, distance, hpMultiplier, boss }) {
  const base = 85 + encounters * 17 + Math.min(130, distance * 0.026);
  return base * hpMultiplier * (boss ? 1.15 : 1);
}

export function encounterAshReward({ encounters, distance, rewardMultiplier, ashMultiplier, scavengerLevel, bonusAsh = false }) {
  const base = Math.round((8 + encounters * 3 + Math.sqrt(distance) * 0.22) * rewardMultiplier * ashMultiplier * (1 + scavengerLevel * 0.05));
  return base + (bonusAsh ? Math.round(18 + encounters * 2) : 0);
}

export function bossPackReward(encounters) {
  return 1 + (encounters % 10 === 0 ? 1 : 0);
}

export function boxAshReward(randomValue, scavengerLevel) {
  return Math.round((14 + randomValue * 18) * (1 + scavengerLevel * 0.08));
}

export function boxRewardFromRoll(roll, scavengerLevel, hasCosmeticFind) {
  const luck = scavengerLevel * 0.06;
  const findChance = (hasCosmeticFind ? 0.045 : 0) + scavengerLevel * 0.008;
  if (roll < findChance) return 'cosmetic';
  if (roll < 0.26 + luck) return 'ash';
  if (roll < 0.42 + luck) return 'heart';
  if (roll < 0.57 + luck) return 'speed';
  if (roll < 0.68 + luck) return 'ghost';
  return 'empty';
}

export function bossIndexForEncounter(encounterNumber, bossCount) {
  if (encounterNumber <= 0 || encounterNumber % 5 !== 0 || bossCount <= 0) return -1;
  return (Math.floor(encounterNumber / 5) - 1) % bossCount;
}

export function streetEncounterIndex(randomValue, encounterCount) {
  if (encounterCount <= 0) return -1;
  return Math.min(encounterCount - 1, Math.floor(Math.max(0, randomValue) * encounterCount));
}

export function progressionValue(save, stat) {
  if (['best', 'smoked', 'bosses', 'runs'].includes(stat)) return save?.[stat] ?? 0;
  return save?.stats?.[stat] ?? 0;
}

export function meetsUnlockCondition(save, source = {}) {
  if (source.type === 'default') return true;
  if (source.type === 'stat') return progressionValue(save, source.stat) >= source.value;
  if (source.type === 'boss') return (save?.bossWins?.[source.boss] ?? 0) >= source.count;
  return false;
}
