import test from 'node:test';
import assert from 'node:assert/strict';

import {
  drawCodeCat,
  drawCosmeticThumbnail,
  drawCodeGlasses,
  drawCodeHat,
  drawTitleMascot,
  drawWardrobeMascot,
} from '../src/rendering/code-art.js';

function fakeContext() {
  return new Proxy({}, {
    get(target, key) {
      if (!(key in target)) target[key] = () => {};
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  });
}

const glasses = ['none','shades','round','heart','pit','cyber','star','goggles','monocle','threeD','lightning','laser'];
const hats = ['none','beanie','trucker','cowboy','wizard','crown','bucket','devil','propeller','halo','chef','cone'];
const patterns = ['plain','tux','calico','siamese','black','snow','tabby','tortie','ghost','neon','tiger','skeleton'];

test('exports one reusable code-native mascot system', () => {
  assert.equal(typeof drawCodeCat, 'function');
  assert.equal(typeof drawCosmeticThumbnail, 'function');
  assert.equal(typeof drawTitleMascot, 'function');
  assert.equal(typeof drawWardrobeMascot, 'function');
});

test('renders every skin and equippable without a raster dependency', () => {
  const p = fakeContext();
  for (const pattern of patterns) {
    drawCodeCat(p, 100, 100, 1.5, {
      skin: { id:`skin_${pattern}`, body:'#d66e57', head:'#e47c61', inner:'#f0a28d', pattern },
      glasses: glasses[pattern.length % glasses.length],
      hat: hats[pattern.length % hats.length],
      run: 2.4,
      puff: .8,
      smoking: true,
    });
  }
  for (const style of glasses) drawCodeGlasses(p, style, 0, 0, 2);
  for (const style of hats) drawCodeHat(p, style, 0, 0, 2);
  for (const pose of ['idle','run','jump','puff']) drawCodeCat(p, 100, 100, 2, { pose, airborne:pose==='jump', puff:pose==='puff'?1:0 });
});

test('renders title and wardrobe surfaces from the same mascot', () => {
  const context = fakeContext();
  const canvas = { width:640, height:264, getContext:() => context };
  const skin = { id:'skin_tiger', body:'#d77a31', head:'#e68c3e', inner:'#f1a18b', pattern:'tiger' };

  drawTitleMascot(canvas, 2, skin);
  drawWardrobeMascot(canvas, 2, { skin, glasses:'laser', hat:'cone' });
  drawCosmeticThumbnail(canvas, 2, { skin, glasses:'laser', hat:'cone' });
});
