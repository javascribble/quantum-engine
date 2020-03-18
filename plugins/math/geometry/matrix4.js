import { vector3 } from './vector3';

const components = 16;

function create(type = Float32Array) {
    const m4 = new type(components);
    setIdentity(m4);
    return m4;
}

function orthographic(left = -100, right = 100, bottom = -100, top = 100, near = 0, far = -1) {
    const x = 1 / (right - left);
    const y = 1 / (top - bottom);
    const z = 1 / (far - near);

    const m4 = create();
    m4[0] = 2 * x;
    m4[5] = 2 * y;
    m4[10] = 2 * -z;
    m4[12] = -(right + left) * x;
    m4[13] = -(top + bottom) * y;
    m4[14] = -(far + near) * z;
    return m4;
}

function perspective(radians = Math.PI / 2, aspect = 1, near = 0, far = 100) {
    const d = 1 / Math.tan(radians / 2);
    const r = 1 / (near - far);

    const m4 = create();
    m4[0] = d / aspect;
    m4[5] = d;
    m4[10] = (far + near) * r;
    m4[11] = -1;
    m4[14] = 2 * far * near * r;
    m4[15] = 0;
    return m4;
}

function setIdentity(m4) {
    m4[0] = 1;
    m4[1] = 0;
    m4[2] = 0;
    m4[3] = 0;
    m4[4] = 0;
    m4[5] = 1;
    m4[6] = 0;
    m4[7] = 0;
    m4[8] = 0;
    m4[9] = 0;
    m4[10] = 1;
    m4[11] = 0;
    m4[12] = 0;
    m4[13] = 0;
    m4[14] = 0;
    m4[15] = 1;
}

function setTranslation(m4, v3) {
    m4[12] = v3.x;
    m4[13] = v3.y;
    m4[14] = v3.z;
}

function setRotation(m4, v3) {
    // TODO: 3d rotation.
    const s = Math.sin(v3.z);
    const c = Math.cos(v3.z);
    m4[0] = c;
    m4[1] = s;
    m4[4] = -s;
    m4[5] = c;
}

function setScale(m4, v3) {
    m4[0] = v3.x;
    m4[5] = v3.y;
    m4[10] = v3.z;
}

function multiply(m4a, m4b, m4c) {
    const a00 = m4a[0];
    const a01 = m4a[1];
    const a02 = m4a[2];
    const a03 = m4a[3];
    const a10 = m4a[4];
    const a11 = m4a[5];
    const a12 = m4a[6];
    const a13 = m4a[7];
    const a20 = m4a[8];
    const a21 = m4a[9];
    const a22 = m4a[10];
    const a23 = m4a[11];
    const a30 = m4a[12];
    const a31 = m4a[13];
    const a32 = m4a[14];
    const a33 = m4a[15];
    const b00 = m4b[0];
    const b01 = m4b[1];
    const b02 = m4b[2];
    const b03 = m4b[3];
    const b10 = m4b[4];
    const b11 = m4b[5];
    const b12 = m4b[6];
    const b13 = m4b[7];
    const b20 = m4b[8];
    const b21 = m4b[9];
    const b22 = m4b[10];
    const b23 = m4b[11];
    const b30 = m4b[12];
    const b31 = m4b[13];
    const b32 = m4b[14];
    const b33 = m4b[15];

    m4c[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    m4c[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    m4c[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    m4c[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    m4c[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    m4c[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    m4c[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    m4c[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    m4c[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    m4c[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    m4c[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    m4c[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    m4c[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    m4c[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    m4c[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    m4c[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
}

function lookAt(m4, point, eye, up) {
    const z = vector3.normalize(vector3.subtract(eye, point));
    const x = vector3.normalize(vector3.crossProduct(up, z));
    const y = vector3.normalize(vector3.crossProduct(z, x));

    m4[0] = x[0];
    m4[1] = y[0];
    m4[2] = z[0];
    m4[3] = 0;
    m4[4] = x[1];
    m4[5] = y[1];
    m4[6] = z[1];
    m4[7] = 0;
    m4[8] = x[2];
    m4[9] = y[2];
    m4[10] = z[2];
    m4[11] = 0;
    m4[12] = -vector3.dotProduct(x, eye);
    m4[13] = -vector3.dotProduct(y, eye);
    m4[14] = -vector3.dotProduct(z, eye);
    m4[15] = 1;  
}

export const matrix4 = {
    components,
    create,
    orthographic,
    perspective,
    setIdentity,
    setTranslation,
    setRotation,
    setScale,
    multiply,
    lookAt
};