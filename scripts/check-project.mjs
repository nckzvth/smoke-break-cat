import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const progression = await readFile(new URL('../src/game/progression.js', import.meta.url), 'utf8');
const codeArt = await readFile(new URL('../src/rendering/code-art.js', import.meta.url), 'utf8');
const failures = [];

function requireMatch(pattern, message) {
  if (!pattern.test(html)) failures.push(message);
}

requireMatch(/<!doctype html>/i, 'index.html must declare an HTML5 doctype');
requireMatch(/<canvas\s+id="game"/, 'index.html must include the game canvas');
requireMatch(/<link\s+rel="manifest"/, 'index.html must link the web manifest');
requireMatch(/smoke-mode/, 'compact smoke-mode layout hooks must remain present');
requireMatch(/rendering\/code-art\.js/, 'runtime must load the code-native art module');
requireMatch(/<canvas id="titleCat"/, 'title mascot must be code-drawn on canvas');
requireMatch(/state\/save-schema\.js/, 'runtime must load the versioned save schema module');
requireMatch(/game\/progression\.js/, 'runtime must load the deterministic progression module');
requireMatch(/loadStoredSave\(saveStorage\)/, 'runtime must load progress through the migration adapter');
requireMatch(/writeStoredSave\(saveStorage,save\)/, 'runtime must persist progress through the guarded storage adapter');
requireMatch(/id="exportSaveBtn"/, 'wardrobe must expose save backup download');
requireMatch(/id="importSaveBtn"/, 'wardrobe must expose save backup restore');
requireMatch(/parseSaveBackup/, 'backup restore must use validated save parsing');
requireMatch(/id="playtestToggle" hidden/, 'playtest lab entry point must be hidden by default');
requireMatch(/get\('playtest'\)==='1'/, 'playtest lab must require an explicit query gate');
requireMatch(/if\(playtestEnabled\)\{document\.documentElement\.dataset\.saveStatus='playtest-session';return true;\}/, 'playtest mutations must never write to the real save');
requireMatch(/data-playtest-boss="machine"/, 'playtest lab must reach every production boss tier');
requireMatch(/id="playtestFlyer"/, 'playtest lab must expose deterministic flyer inspection');
requireMatch(/id="playtestBox"/, 'playtest lab must expose the box-break regression path');
requireMatch(/id:'skin_skeleton'/, 'Bone Cat must use the real skin_skeleton renderer key');
requireMatch(/drawCodeCat\(ctx,x,y,t/, 'gameplay must use the shared code-drawn cat');
requireMatch(/drawTitleMascot\(/, 'title must use the shared code-drawn mascot');
requireMatch(/drawWardrobeMascot\(/, 'wardrobe must use the shared code-drawn mascot');
requireMatch(/drawCosmeticThumbnail\(/, 'wardrobe cards must sell cosmetics with code-drawn thumbnails');
requireMatch(/className='cosThumb'/, 'wardrobe must render visual cosmetic cards');
if (!/export const CAT_RUN_KEY_COUNT=RUN_POSES\.length/.test(codeArt)) failures.push('shared mascot must expose its six-key run-cycle contract');
if (!codeArt.startsWith('// GREMLIN ZINE renderer:')) failures.push('the rejected transitional mascot renderer must not return');
if (!/GREMLIN ZINE: raw screen-print UI/.test(html)) failures.push('the game shell must retain the approved punk-editorial vector language');
if (!/original urban chibi biped/.test(codeArt)) failures.push('the mascot must retain the approved upright urban-chibi construction');
if (!/if\(!smoking\)drawArm\(p,pose\.arms\[1\]/.test(codeArt) || !/if\(smoking\)drawArm\(p,\[15,-29,30,-33,25\+recoil,-43\]/.test(codeArt)) failures.push('the smoking arm must replace the normal near-arm swing instead of creating a fifth limb');
if (/skin_bone:/.test(html)) failures.push('obsolete skin_bone renderer key must not return');
if (/function catSpriteFilter\(/.test(html)) failures.push('whole-image cosmetic filters must not return');
if (/skin-palette\.js|street-cat-[^'"\s]+\.png|cosmetics-(?:glasses|hats)-v1\.png|hazards-(?:ground|flying)-v1\.png|smokeables-(?:original|candy)-v1\.png/.test(html)) failures.push('runtime must not reference rejected generated raster art');
if (/LUCKY STRIKE/i.test(html)) failures.push('unapproved real-world brand reference must not return');
if (/localStorage\.setItem/.test(html)) failures.push('runtime must not bypass the guarded save adapter');
if (/function passiveDps\(|function tapPower\(|function baseMaxHearts\(/.test(html)) failures.push('progression formulas must not drift back into the runtime');
for (const exportName of ['UPGRADE_RULES','encounterMaxHp','encounterAshReward','boxRewardFromRoll','bossIndexForEncounter','meetsUnlockCondition']) {
  if (!new RegExp(`export (?:const|function) ${exportName}`).test(progression)) failures.push(`progression module must export ${exportName}`);
}
for (const style of ['shades','round','heart','pit','cyber','star','goggles','monocle','threeD','lightning','laser','beanie','trucker','cowboy','wizard','crown','bucket','devil','propeller','halo','chef','cone']) {
  if (!codeArt.includes(`style==='${style}'`) && !codeArt.includes(`style === '${style}'`)) failures.push(`missing code-native cosmetic renderer for ${style}`);
}

if (/user-scalable\s*=\s*no/i.test(html)) {
  failures.push('viewport metadata must not disable user zoom');
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) failures.push(`duplicate HTML ids: ${duplicateIds.join(', ')}`);

const scriptBlocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
if (!scriptBlocks.length) failures.push('index.html must contain game JavaScript');

for (const [index, block] of scriptBlocks.entries()) {
  try {
    const attributes = block[0].slice(0, block[0].indexOf('>'));
    const moduleArgs = /type=["']module["']/i.test(attributes) ? ['--input-type=module'] : [];
    execFileSync(process.execPath, [...moduleArgs, '--check', '-'], {
      input: block[1],
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (error) {
    failures.push(`inline script ${index + 1}: ${error.stderr?.toString().trim() || error.message}`);
  }
}

const shippedArtFiles = await readdir(new URL('../public/assets/', import.meta.url), { recursive: true }).catch(() => []);
const rejectedRasterFiles = shippedArtFiles.filter((file) => /(?:street-cat|cosmetics-|hazards-|smokeables-).*\.png$/i.test(file));
if (rejectedRasterFiles.length) failures.push(`rejected generated raster art must not ship: ${rejectedRasterFiles.join(', ')}`);

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Project checks passed: ${ids.length} unique ids, ${scriptBlocks.length} valid inline script, shared code-native mascot, 22 code-native cosmetics, and no rejected generated raster art.`);
