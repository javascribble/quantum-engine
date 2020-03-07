import { convertDegreesToRadians } from './angles';

export const matrix4components = 16;

export function createMatrix4() {
    let m = new Float32Array(matrix4components);
    matrix4SetIdentity(m);
    return m;
}

export function setMatrix4Identity(m) {
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
}

export function setMatrix4Translation(m, v) {
    m[12] = v.x;
    m[13] = v.y;
    m[14] = v.z;
}

export function setMatrix4Rotation(m, v) {
    // TODO: 3d rotation.
    let s = Math.sin(v.a);
    let c = Math.cos(v.a);
    m[0] = c;
    m[1] = s;
    m[4] = -s;
    m[5] = c;
}

export function setMatrix4Scale(m, v) {
    m[0] = v.x;
    m[5] = v.y;
    m[10] = v.z;
}

export function multiplyMatrix4(a, b, c) {
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a03 = a[3];
    let a10 = a[4];
    let a11 = a[5];
    let a12 = a[6];
    let a13 = a[7];
    let a20 = a[8];
    let a21 = a[9];
    let a22 = a[10];
    let a23 = a[11];
    let a30 = a[12];
    let a31 = a[13];
    let a32 = a[14];
    let a33 = a[15];
    let b00 = b[0];
    let b01 = b[1];
    let b02 = b[2];
    let b03 = b[3];
    let b10 = b[4];
    let b11 = b[5];
    let b12 = b[6];
    let b13 = b[7];
    let b20 = b[8];
    let b21 = b[9];
    let b22 = b[10];
    let b23 = b[11];
    let b30 = b[12];
    let b31 = b[13];
    let b32 = b[14];
    let b33 = b[15];

    c[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    c[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    c[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    c[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    c[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    c[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    c[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    c[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    c[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    c[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    c[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    c[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    c[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    c[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    c[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    c[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
}

export function createOrthographicMatrix4(left = -100, right = 100, bottom = -100, top = 100, near = 0, far = -1) {
    let x = 1 / (right - left);
    let y = 1 / (top - bottom);
    let z = 1 / (far - near);

    let array = Matrix4.getIdentity();
    array[0] = 2 * x;
    array[5] = 2 * y;
    array[10] = 2 * -z;
    array[12] = -(right + left) * x;
    array[13] = -(top + bottom) * y;
    array[14] = -(far + near) * z;
    return array;
}

export function createPerspectiveMatrix4(angle = 30, near = 0, far = 100, aspect = 1) {
    let d = 1 / Math.tan(convertDegreesToRadians(angle / 2));
    let r = 1 / (far - near);
    let a = 1 / aspect;

    let array = Matrix4.getIdentity();
    array[0] = d * a;
    array[5] = d;
    array[10] = -(far + near) * r;
    array[11] = -1;
    array[14] = near * far * r * -2;
    array[15] = 0;
    return array;
}

export function setMatrix4Target(matrix, target, position, up) {
    let z = Vector3.difference(target, position);
    z.normalize();

    let x = Vector3.crossProduct(z, up);
    x.normalize();

    let y = Vector3.crossProduct(x, z);

    let array = matrix.array;
    array[0] = x.x;
    array[1] = x.y;
    array[2] = x.z;
    array[3] = 0;
    array[4] = y.x;
    array[5] = y.y;
    array[6] = y.z;
    array[7] = 0;
    array[8] = -z.x;
    array[9] = -z.y;
    array[10] = -z.z;
    array[11] = 0;

    matrix.translate(position.inverse);
}
