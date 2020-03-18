import { convertDegreesToRadians } from './angles';
import { v3 } from './vector3';

function create() {
    const matrix4 = new Float32Array(m4.components);
    setIdentity(matrix4);
    return matrix4;
}

function createOrthographic(left = -100, right = 100, bottom = -100, top = 100, near = 0, far = -1) {
    const x = 1 / (right - left);
    const y = 1 / (top - bottom);
    const z = 1 / (far - near);

    const matrix4 = create();
    matrix4[0] = 2 * x;
    matrix4[5] = 2 * y;
    matrix4[10] = 2 * -z;
    matrix4[12] = -(right + left) * x;
    matrix4[13] = -(top + bottom) * y;
    matrix4[14] = -(far + near) * z;
    return matrix4;
}

function createPerspective(angleInDegrees = 30, near = 0, far = 100, aspect = 1) {
    const d = 1 / Math.tan(convertDegreesToRadians(angleInDegrees / 2));
    const r = 1 / (far - near);
    const a = 1 / aspect;

    const matrix4 = create();
    matrix4[0] = d * a;
    matrix4[5] = d;
    matrix4[10] = -(far + near) * r;
    matrix4[11] = -1;
    matrix4[14] = near * far * r * -2;
    matrix4[15] = 0;
    return matrix4;
}

function setIdentity(matrix4) {
    matrix4[0] = 1;
    matrix4[1] = 0;
    matrix4[2] = 0;
    matrix4[3] = 0;
    matrix4[4] = 0;
    matrix4[5] = 1;
    matrix4[6] = 0;
    matrix4[7] = 0;
    matrix4[8] = 0;
    matrix4[9] = 0;
    matrix4[10] = 1;
    matrix4[11] = 0;
    matrix4[12] = 0;
    matrix4[13] = 0;
    matrix4[14] = 0;
    matrix4[15] = 1;
}

function setTranslation(matrix4, vector3) {
    matrix4[12] = vector3.x;
    matrix4[13] = vector3.y;
    matrix4[14] = vector3.z;
}

function setRotation(matrix4, vector3) {
    // TODO: 3d rotation.
    const s = Math.sin(vector3.z);
    const c = Math.cos(vector3.z);
    matrix4[0] = c;
    matrix4[1] = s;
    matrix4[4] = -s;
    matrix4[5] = c;
}

function setScale(matrix4, vector3) {
    matrix4[0] = vector3.x;
    matrix4[5] = vector3.y;
    matrix4[10] = vector3.z;
}

function multiply(matrix4a, matrix4b, matrix4c) {
    const a00 = matrix4a[0];
    const a01 = matrix4a[1];
    const a02 = matrix4a[2];
    const a03 = matrix4a[3];
    const a10 = matrix4a[4];
    const a11 = matrix4a[5];
    const a12 = matrix4a[6];
    const a13 = matrix4a[7];
    const a20 = matrix4a[8];
    const a21 = matrix4a[9];
    const a22 = matrix4a[10];
    const a23 = matrix4a[11];
    const a30 = matrix4a[12];
    const a31 = matrix4a[13];
    const a32 = matrix4a[14];
    const a33 = matrix4a[15];
    const b00 = matrix4b[0];
    const b01 = matrix4b[1];
    const b02 = matrix4b[2];
    const b03 = matrix4b[3];
    const b10 = matrix4b[4];
    const b11 = matrix4b[5];
    const b12 = matrix4b[6];
    const b13 = matrix4b[7];
    const b20 = matrix4b[8];
    const b21 = matrix4b[9];
    const b22 = matrix4b[10];
    const b23 = matrix4b[11];
    const b30 = matrix4b[12];
    const b31 = matrix4b[13];
    const b32 = matrix4b[14];
    const b33 = matrix4b[15];

    matrix4c[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    matrix4c[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    matrix4c[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    matrix4c[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    matrix4c[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    matrix4c[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    matrix4c[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    matrix4c[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    matrix4c[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    matrix4c[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    matrix4c[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    matrix4c[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    matrix4c[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    matrix4c[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    matrix4c[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    matrix4c[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
}

function lookAt(transformation, target, position, up) {
    const z = v3.difference(target, position);
    z.normalize();

    const x = v3.crossProduct(z, up);
    x.normalize();

    const y = v3.crossProduct(x, z);

    transformation[0] = x.x;
    transformation[1] = x.y;
    transformation[2] = x.z;
    transformation[3] = 0;
    transformation[4] = y.x;
    transformation[5] = y.y;
    transformation[6] = y.z;
    transformation[7] = 0;
    transformation[8] = -z.x;
    transformation[9] = -z.y;
    transformation[10] = -z.z;
    transformation[11] = 0;

    transformation.translate(position.inverse);
}

export const m4 = {
    get components() { return 16; },
    create,
    createOrthographic,
    createPerspective,
    setIdentity,
    setTranslation,
    setRotation,
    setScale,
    multiply,
    lookAt
};