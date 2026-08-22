import test from 'node:test';
import assert from 'node:assert/strict';

import { isWarmFurPixel, recolorFurPixel, skinRgb } from '../src/rendering/skin-palette.js';

test('parses six-digit skin colors', () => {
  assert.deepEqual(skinRgb('#80e1c1'), [128, 225, 193]);
});

test('selects warm authored fur but not protected identity colors', () => {
  assert.equal(isWarmFurPixel(217, 119, 47), true, 'ginger fur');
  assert.equal(isWarmFurPixel(246, 209, 110), false, 'gold eye');
  assert.equal(isWarmFurPixel(233, 198, 165), false, 'cream muzzle');
  assert.equal(isWarmFurPixel(127, 63, 70), false, 'pink nose');
  assert.equal(isWarmFurPixel(15, 16, 22), false, 'black ink');
});

test('recolors fur with preserved shading and leaves protected pixels byte-identical', () => {
  const blackBody = skinRgb('#25252d');
  const blackHead = skinRgb('#2e2e38');
  const shadow = recolorFurPixel(120, 72, 36, blackBody, blackHead);
  const highlight = recolorFurPixel(230, 140, 62, blackBody, blackHead);

  assert.ok(highlight[0] > shadow[0]);
  assert.ok(highlight[1] > shadow[1]);
  assert.deepEqual(recolorFurPixel(246, 209, 110, blackBody, blackHead), [246, 209, 110]);
  assert.deepEqual(recolorFurPixel(15, 16, 22, blackBody, blackHead), [15, 16, 22]);
});
