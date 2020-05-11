export const lerp = (number, prime, ratio) => number + (number - prime) * ratio;

export const clamp = (number, min, max) => number >= max ? max : number <= min ? min : number;