export function skinRgb(hex) {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function isWarmFurPixel(r, g, b) {
  return r > 68 && r > g * 1.22 && g > b * 0.95;
}

export function recolorFurPixel(r, g, b, body, head) {
  if (!isWarmFurPixel(r, g, b)) return [r, g, b];

  const luminance = 0.213 * r + 0.715 * g + 0.072 * b;
  const headMix = Math.max(0, Math.min(1, (luminance - 92) / 105));
  const shade = 0.68 + 0.42 * Math.max(0, Math.min(1, (luminance - 52) / 172));

  return body.map((channel, index) => Math.min(
    255,
    Math.round((channel + (head[index] - channel) * headMix) * shade),
  ));
}
