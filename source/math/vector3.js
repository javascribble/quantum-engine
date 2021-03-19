import { Vector2 } from './vector2.js';

export class Vector3 extends Vector2 {
    constructor(buffer = Vector3.identity, offset = 0, length = 3) {
        super(buffer, offset, length);
    }

    get z() { return this[2]; }
    get r() { return this[0]; }
    get g() { return this[1]; }
    get b() { return this[2]; }
    get h() { return this[0]; }
    get s() { return this[1]; }
    get v() { return this[2]; }
    get l() { return this[2]; }

    static identity = new Vector3([0, 0, 0]);

    static distance(v3a, v3b) {
        return Math.sqrt(Vector3.distanceSquared(v3a, v3b));
    }

    static distanceSquared(v3a, v3b) {
        return Math.sqr(v3a[0] - v3b[0]) + Math.sqr(v3a[1] - v3b[1]) + Math.sqr(v3a[2] - v3b[2]);
    }

    static distanceSquaredNormalized(v3a, v3b, v3c) {
        return Math.sqr(v3a[0] - v3b[0]) / Math.sqr(v3c[0]) + Math.sqr(v3a[1] - v3b[1]) / Math.sqr(v3c[1]) + Math.sqr(v3a[2] - v3b[2]) / Math.sqr(v3c[2]);
    }

    static dot(v3a, v3b) {
        return v3a[0] * v3b[0] + v3a[1] * v3b[1] + v3a[2] * v3b[2];
    }

    static cross(v3a, v3b, v3c = new Vector3()) {
        v3c[0] = v3a[1] * v3b[2] - v3a[2] * v3b[1];
        v3c[1] = v3a[2] * v3b[0] - v3a[0] * v3b[2];
        v3c[2] = v3a[0] * v3b[1] - v3a[1] * v3b[0];
        return v3c;
    }

    static normalize(v3a, v3b = v3a) {
        const m = 1 / Math.hypot(v3a[0], v3a[1], v3a[2]);
        v3a[0] *= m;
        v3a[1] *= m;
        v3a[2] *= m;
        return v3b;
    }

    static sum(v3a, v3b, v3c = new Vector3()) {
        Vector2.sum(v3a, v3b, v3c);
        v3c[2] = v3a[2] + v3b[2];
        return v3c;
    }

    static difference(v3a, v3b, v3c = new Vector3()) {
        Vector2.difference(v3a, v3b, v3c);
        v3c[2] = v3a[2] - v3b[2];
        return v3c;
    }

    static product(v3a, v3b, v3c = new Vector3()) {
        Vector2.product(v3a, v3b, v3c);
        v3c[2] = v3a[2] * v3b[2];
        return v3c;
    }

    static quotient(v3a, v3b, v3c = new Vector3()) {
        Vector2.quotient(v3a, v3b, v3c);
        v3c[2] = v3a[2] / v3b[2];
        return v3c;
    }
}