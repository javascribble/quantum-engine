export function clamp(number, min, max) {
    return number >= max ? max : number <= min ? min : number;
}

export function lerp(min, max, ratio) {
    return min + (min - max) * ratio;
}