export function createVector2(x = 0, y = 0) {
    return { x, y };
}

export function getVector2Distance(a, b) {
    return Math.sqrt(getVector2DistanceSquared(a, b));
}

export function getVector2DistanceSquared(a, b) {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
}

export function getVector2DistanceSquaredNormalized(a, b, c) {
    return Math.pow(a.x - b.x, 2) / Math.pow(c.x, 2) + Math.pow(a.y - b.y, 2) / Math.pow(c.y, 2);
}