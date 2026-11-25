export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export interface Point2D {
  x: number;
  y: number;
}

export interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Computes a gentle magnetic offset for pointer proximity inside an element's bounds.
 */
export function computeMagneticOffset(
  pointer: Point2D,
  rect: RectLike,
  maxDisplacement = 7
): Point2D {
  if (rect.width <= 0 || rect.height <= 0) {
    return { x: 0, y: 0 };
  }
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const normX = clamp((pointer.x - centerX) / (rect.width / 2), -1, 1);
  const normY = clamp((pointer.y - centerY) / (rect.height / 2), -1, 1);

  return {
    x: Number((normX * maxDisplacement).toFixed(2)),
    y: Number((normY * maxDisplacement).toFixed(2)),
  };
}

/**
 * Splits a string into word tokens while preserving whitespace discipline for masked reveals.
 */
export function splitWordsForReveal(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0);
}

/**
 * Computes a bounded subtle parallax offset in pixels given an element's viewport center ratio (-1 to 1).
 */
export function computeScrollParallax(
  elementCenterY: number,
  viewportHeight: number,
  amplitude = 26
): number {
  if (viewportHeight <= 0) return 0;
  const normalized = clamp(
    (elementCenterY - viewportHeight / 2) / (viewportHeight / 2),
    -1,
    1
  );
  return Number((normalized * amplitude).toFixed(2));
}
