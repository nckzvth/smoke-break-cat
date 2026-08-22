import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CAT_RUN_KEY_COUNT,
  drawCodeCat,
  drawCosmeticThumbnail,
  drawCodeGlasses,
  drawCodeHat,
  drawTitleMascot,
  drawWardrobeMascot,
  sampleCodeCatRunPose,
} from '../src/rendering/code-art.js';

function fakeContext() {
  const context = {
    scale(...args) {
      assert.equal(args.length, 2, 'CanvasRenderingContext2D.scale requires x and y arguments');
      assert.ok(args.every(Number.isFinite), 'canvas scales must be finite');
    },
  };
  return new Proxy(context, {
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
  assert.equal(CAT_RUN_KEY_COUNT, 6);
  assert.equal(typeof drawCodeCat, 'function');
  assert.equal(typeof drawCosmeticThumbnail, 'function');
  assert.equal(typeof drawTitleMascot, 'function');
  assert.equal(typeof drawWardrobeMascot, 'function');
});

test('runs with contralateral arm and leg phases', () => {
  for (let key=0; key<CAT_RUN_KEY_COUNT; key++) {
    const pose=sampleCodeCatRunPose(key);
    assert.ok(pose.arms[0][0]>0,'rear-layer arm must root toward the front of the torso');
    assert.ok(pose.arms[1][0]<0,'front-layer arm must root toward the back of the torso');
    const farArm=pose.arms[0][4]-pose.arms[0][0];
    const nearArm=pose.arms[1][4]-pose.arms[1][0];
    const farLeg=pose.legs[0][4]-pose.legs[0][0];
    const nearLeg=pose.legs[1][4]-pose.legs[1][0];
    assert.equal(Math.sign(farArm),-Math.sign(nearArm),'arms must pump in opposite directions');
    assert.equal(Math.sign(farArm),-Math.sign(farLeg),'far arm must oppose far leg');
    assert.equal(Math.sign(nearArm),-Math.sign(nearLeg),'near arm must oppose near leg');
  }
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
