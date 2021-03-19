import { Matrix3 } from './matrix3.js';
import { Vector3 } from "./vector3";

export class Transform3 extends Matrix3 {
    constructor(buffer = Matrix3.identity, offset = 0, length = 2) {
        super(buffer, offset, length);

        this.translation = new Vector3(buffer, 0, 3);
        this.rotation = new Vector3(buffer, 0, 3);
        this.scale = new Vector3(buffer, 0, 3);
    }

    setTranslation(m3, v2) {
        m3[6] = v2[0];
        m3[7] = v2[1];
    }

    setRotation(m3, radians) {
        const s = Math.sin(radians);
        const c = Math.cos(radians);
        m3[0] = c;
        m3[1] = -s;
        m3[3] = s;
        m3[4] = c;
    }

    setScale(m3, v2) {
        m3[0] = v2[0];
        m3[4] = v2[1];
    }
}