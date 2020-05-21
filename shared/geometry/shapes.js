import { distanceSquaredVector2, distanceSquaredNormalizedVector2 } from './vector2.js';

export const circleContainsPoint = (point, center, radius) => distanceSquaredVector2(center, point) <= Math.sqr(radius);

export const ellipseContainsPoint = (point, center, size, rotation) => distanceSquaredNormalizedVector2(point, center, size) <= 1;

export const rectangleContainsPoint = (point, center, size, rotation) => { };

export const rectanglesOverlap = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);