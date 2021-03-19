export class Circle {
    contains() {
        Vector2.distanceSquared(center, point) <= Math.sqr(radius);
    }
}

export class Ellipse {
    contains() {
        Vector2.distanceSquaredNormalized(point, center, size) <= 1;
    }
}

export class Rectangle {
    contains() {

    }
}