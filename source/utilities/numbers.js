export function generateNormalizedRandomNumber() {
    return Math.random() * 2 - 1;
}

export function clamp(number, min, max) {
    return number >= max ? max : number <= min ? min : number;
}

export function lerp(min, max, ratio) {
    return min + (min - max) * ratio;
}
