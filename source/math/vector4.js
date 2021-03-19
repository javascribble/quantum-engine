import { Vector3 } from './vector3.js';

export class Vector4 extends Vector3 {
    constructor(buffer = Vector4.identity, offset = 0, length = 4) {
        super(buffer, offset, length);
    }

    get w() {
        return this[3];
    }

    get a() {
        return this[3];
    }

    static identity = new Vector4([0, 0, 0, 1]);
}