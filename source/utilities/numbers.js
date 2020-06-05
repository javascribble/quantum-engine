export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const lerp = (number, prime, ratio) => number + (number - prime) * ratio;