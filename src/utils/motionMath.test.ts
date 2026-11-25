import test from 'node:test';
import assert from 'node:assert/strict';
import {
  lerp,
  clamp,
  computeMagneticOffset,
  splitWordsForReveal,
  computeScrollParallax,
} from './motionMath';

test('lerp interpolates smoothly between endpoints', () => {
  assert.equal(lerp(0, 100, 0.25), 25);
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 1), 20);
});

test('clamp restricts values to inclusive bounds', () => {
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(4, 0, 10), 4);
});

test('computeMagneticOffset calculates bounded displacement relative to element center', () => {
  const rect = { left: 100, top: 200, width: 200, height: 60 };
  // Center -> zero offset
  assert.deepEqual(computeMagneticOffset({ x: 200, y: 230 }, rect, 8), { x: 0, y: 0 });
  // Far right edge -> +maxDisplacement
  assert.deepEqual(computeMagneticOffset({ x: 300, y: 230 }, rect, 8), { x: 8, y: 0 });
  // Beyond top-left -> clamped to -maxDisplacement
  assert.deepEqual(computeMagneticOffset({ x: 0, y: 0 }, rect, 6), { x: -6, y: -6 });
});

test('splitWordsForReveal cleanly splits prose into non-empty word tokens', () => {
  assert.deepEqual(splitWordsForReveal('  Beyond   Problems. Into Possibilities. '), [
    'Beyond',
    'Problems.',
    'Into',
    'Possibilities.',
  ]);
  assert.deepEqual(splitWordsForReveal('   '), []);
});

test('computeScrollParallax returns bounded parallax offset around viewport center', () => {
  assert.equal(computeScrollParallax(450, 900, 24), 0);
  assert.equal(computeScrollParallax(900, 900, 24), 24);
  assert.equal(computeScrollParallax(0, 900, 24), -24);
  assert.equal(computeScrollParallax(1800, 900, 24), 24);
});
