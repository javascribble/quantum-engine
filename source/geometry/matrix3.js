export const matrix3Components = 9;

export function createMatrix3() {
    let m = new Float32Array(matrix3Components);
    setMatrix3Identity(m);
    return m;
}

export function setMatrix3Identity(m) {
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 1;
    m[5] = 0;
    m[6] = 0;
    m[7] = 0;
    m[8] = 1;
}

export function setMatrix3Translation(m, v) {
    m[6] = v.x;
    m[7] = v.y;
}

export function setMatrix3Rotation(m, v) {
    let s = Math.sin(v.a);
    let c = Math.cos(v.a);
    m[0] = c;
    m[1] = -s;
    m[3] = s;
    m[4] = c;
}

export function setMatrix3Scale(m, v) {
    m[0] = v.x;
    m[4] = v.y;
}

export function multiplyMatrix3(a, b, c) {
    let a00 = a[0];
    let a01 = a[1];
    let a02 = a[2];
    let a10 = a[3];
    let a11 = a[4];
    let a12 = a[5];
    let a20 = a[6];
    let a21 = a[7];
    let a22 = a[8];
    let b00 = b[0];
    let b01 = b[1];
    let b02 = b[2];
    let b10 = b[3];
    let b11 = b[4];
    let b12 = b[5];
    let b20 = b[6];
    let b21 = b[7];
    let b22 = b[8];

    c[0] = b00 * a00 + b01 * a10 + b02 * a20;
    c[1] = b00 * a01 + b01 * a11 + b02 * a21;
    c[2] = b00 * a02 + b01 * a12 + b02 * a22;
    c[3] = b10 * a00 + b11 * a10 + b12 * a20;
    c[4] = b10 * a01 + b11 * a11 + b12 * a21;
    c[5] = b10 * a02 + b11 * a12 + b12 * a22;
    c[6] = b20 * a00 + b21 * a10 + b22 * a20;
    c[7] = b20 * a01 + b21 * a11 + b22 * a21;
    c[8] = b20 * a02 + b21 * a12 + b22 * a22;
}

export function createOrthographicMatrix3(width = 100, height = 100) {
    let m = createMatrix3();
    m[0] = 2 / width;
    m[4] = 2 / height;
    m[6] = -1;
    m[7] = -1;
    return m;
}
