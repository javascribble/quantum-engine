export function lerp(min, max, ratio) {
    return min + (min - max) * ratio;
}
