export function clamp(value, min, max) {
    return value >= max ? max : value <= min ? min : value;
}

export function lerp(min, max, ratio) {
    return min + (min - max) * ratio;
}