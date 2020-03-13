import { v2 } from './vector2';

export function circleContainsPoint(point, center, radius) {
    return v2.distanceSquared(center, point) <= Math.sqr(radius);
}

export function ellipseContainsPoint(point, center, size, rotation) {
    return v2.distanceSquaredNormalized(point, center, size) <= 1;
}

export function rectangleContainsPoint(point, center, size, rotation) {
}
