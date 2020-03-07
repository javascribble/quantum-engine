export function circleContainsPoint(point, center, radius) {
    return Vector2.distanceSquared(center, point) <= Math.sqr(radius);
}

export function ellipseContainsPoint(point, center, size, rotation) {
    return Vector2.distanceSquaredNormalized(point, center, size) <= 1;
}

export function rectangleContainsPoint(point, center, size, rotation) {
}