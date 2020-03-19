import { vector2 } from './vector2';

export const circleContainsPoint = (point, center, radius) => vector2.distanceSquared(center, point) <= Math.sqr(radius);

export const ellipseContainsPoint = (point, center, size, rotation) => vector2.distanceSquaredNormalized(point, center, size) <= 1;

export const rectangleContainsPoint = (point, center, size, rotation) => {
}
