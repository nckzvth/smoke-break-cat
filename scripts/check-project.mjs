import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const failures = [];

function requireMatch(pattern, message) {
  if (!pattern.test(html)) failures.push(message);
}

requireMatch(/<!doctype html>/i, 'index.html must declare an HTML5 doctype');
requireMatch(/<canvas\s+id="game"/, 'index.html must include the game canvas');
requireMatch(/<link\s+rel="manifest"/, 'index.html must link the web manifest');
requireMatch(/smoke-mode/, 'compact smoke-mode layout hooks must remain present');
requireMatch(/street-cat-run-cycle-v2\.png/, 'runtime must load the six-frame run-cycle atlas');
requireMatch(/street-cat-puff-cycle-v1\.png/, 'runtime must load the four-frame encounter-action atlas');
requireMatch(/hazards-ground-v1\.png/, 'runtime must load the ground-hazard atlas');
requireMatch(/hazards-flying-v1\.png/, 'runtime must load the flying-hazard atlas');
requireMatch(/cosmetics-glasses-v1\.png/, 'runtime must load the production eyewear atlas');
requireMatch(/cosmetics-hats-v1\.png/, 'runtime must load the production hat atlas');
requireMatch(/smokeables-original-v1\.png/, 'runtime must load the Original-mode smokeable atlas');
requireMatch(/smokeables-candy-v1\.png/, 'runtime must load the Candy-mode smokeable atlas');
requireMatch(/drawSmokeableAtlas\(v,ratio,held\)/, 'runtime must render production encounter devices through the atlas path');
requireMatch(/\.26\+\.74\*ratio/, 'atlas sticks must preserve burn-down state toward the mouth socket');
requireMatch(/id:'skin_skeleton'/, 'Bone Cat must use the real skin_skeleton renderer key');
requireMatch(/function cachedSkinFrame\(/, 'generated character skins must use cached pose-aware palette frames');
requireMatch(/skin-palette\.js/, 'pose-aware skin classification must live in the tested rendering module');
requireMatch(/skinFrameCache\.size>=160/, 'pose-aware skin cache must remain bounded for mobile memory safety');
requireMatch(/drawRunCycleFrame\(frame,skin\)/, 'run-cycle recoloring must receive the active skin');
requireMatch(/drawPuffCycleFrame\(puffFrame,skin\)/, 'encounter-action recoloring must receive the active skin');
requireMatch(/drawSkinnedSprite\(p,art\.cat,skin/, 'wardrobe preview must use the pose-aware skin pipeline');
requireMatch(/drawGlasses\(glasses,eyeLocal\[0\],eyeLocal\[1\],t\)/, 'eyewear must render inside the pose-local transform');
requireMatch(/drawHat\(hat,eyeLocal\[0\]-6,eyeLocal\[1\]-23,t\)/, 'hats must render inside the pose-local transform');
if (/skin_bone:/.test(html)) failures.push('obsolete skin_bone renderer key must not return');
if (/function catSpriteFilter\(/.test(html)) failures.push('whole-image cosmetic filters must not return');
for (const style of ['shades','round','heart','pit','cyber','star','goggles','monocle','threeD','lightning','laser']) {
  requireMatch(new RegExp(`${style}:\\{frame:`), `missing production eyewear mapping for ${style}`);
}
for (const style of ['beanie','trucker','cowboy','wizard','crown','bucket','devil','propeller','halo','chef','cone']) {
  requireMatch(new RegExp(`${style}:\\{frame:`), `missing production hat mapping for ${style}`);
}
for (const visual of ['cigarette','menthol','nurse','gold','ghost','cigar','vape','vapeLord','hookah','bong','machine','candyStick','mintCandy','wafer','honeycomb','sourBelt','chocolate','juiceBox','sodaJerk','sundae','gumball','candyCrusher']) {
  requireMatch(new RegExp(`${visual}:\\{frame:`), `missing production encounter-device mapping for ${visual}`);
}
if (/street-cat-run-v1\.png/.test(html)) failures.push('runtime must not fall back to the superseded binary gallop pose');

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

const characterAssets = [
  {name:'base',file:'street-cat-base-v1.png',width:768,height:512,budget:600_000},
  {name:'jump',file:'street-cat-jump-v1.png',width:768,height:512,budget:600_000},
  {name:'run cycle',file:'street-cat-run-cycle-v2.png',width:1152,height:768,budget:800_000},
  {name:'puff cycle',file:'street-cat-puff-cycle-v1.png',width:1024,height:1024,budget:1_000_000},
];
const hazardAssets = [
  {name:'ground hazards',file:'hazards-ground-v1.png',width:1152,height:768,budget:800_000},
  {name:'flying hazards',file:'hazards-flying-v1.png',width:1152,height:768,budget:600_000},
];
const cosmeticAssets = [
  {name:'eyewear cosmetics',file:'cosmetics-glasses-v1.png',width:1152,height:768,budget:400_000},
  {name:'hat cosmetics',file:'cosmetics-hats-v1.png',width:1152,height:768,budget:650_000},
];
const smokeableAssets = [
  {name:'Original-mode smokeables',file:'smokeables-original-v1.png',width:1152,height:768,budget:600_000},
  {name:'Candy-mode smokeables',file:'smokeables-candy-v1.png',width:1152,height:768,budget:650_000},
];
const productionAssets = [
  ...characterAssets.map((asset)=>({...asset,directory:'characters'})),
  ...hazardAssets.map((asset)=>({...asset,directory:''})),
  ...cosmeticAssets.map((asset)=>({...asset,directory:''})),
  ...smokeableAssets.map((asset)=>({...asset,directory:''})),
];
for (const asset of productionAssets) {
  const path = new URL(`../public/assets/${asset.directory?`${asset.directory}/`:''}${asset.file}`, import.meta.url);
  try {
    const png = await readFile(path);
    const isPng = png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    if (!isPng) failures.push(`${asset.name} asset must be a PNG`);
    if (png.length > asset.budget) failures.push(`${asset.name} asset exceeds the ${Math.round(asset.budget/1000)} KB budget`);
    if (png.length >= 26) {
      const width = png.readUInt32BE(16), height = png.readUInt32BE(20), colorType = png[25];
      if (width !== asset.width || height !== asset.height) failures.push(`${asset.name} asset must be ${asset.width}×${asset.height}`);
      if (![4, 6].includes(colorType)) failures.push(`${asset.name} asset must preserve alpha transparency`);
    }
  } catch (error) {
    failures.push(`missing ${asset.name} asset: ${error.message}`);
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Project checks passed: ${ids.length} unique ids, ${scriptBlocks.length} valid inline script, ${characterAssets.length} character assets, ${hazardAssets.length} hazard atlases, ${cosmeticAssets.length} cosmetic atlases, and ${smokeableAssets.length} encounter atlases.`);
