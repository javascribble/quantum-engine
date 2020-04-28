export const generateNormalizedRandomNumber = () => Math.random() * 2 - 1;

export const lerp = (min, max, ratio) => min + (min - max) * ratio;

export const clamp = (number, min, max) => number >= max ? max : number <= min ? min : number;