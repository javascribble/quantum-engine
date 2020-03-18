function create() {
    const matrix3 = new Float32Array(m3.components);
    setIdentity(matrix3);
    return matrix3;
}

function createOrthographic(width = 100, height = 100) {
    const matrix3 = create();
    matrix3[0] = 2 / width;
    matrix3[4] = 2 / height;
    matrix3[6] = -1;
    matrix3[7] = -1;
    return matrix3;
}

function setIdentity(matrix3) {    
    matrix3[0] = 1;
    matrix3[1] = 0;
    matrix3[2] = 0;
    matrix3[3] = 0;
    matrix3[4] = 1;
    matrix3[5] = 0;
    matrix3[6] = 0;
    matrix3[7] = 0;
    matrix3[8] = 1;
}

function setTranslation(matrix3, vector2) {
    matrix3[6] = vector2.x;
    matrix3[7] = vector2.y;
}

function setRotation(matrix3, angleInRadians) {
    const s = Math.sin(angleInRadians);
    const c = Math.cos(angleInRadians);
    matrix3[0] = c;
    matrix3[1] = -s;
    matrix3[3] = s;
    matrix3[4] = c;
}

function setScale(matrix3, vector2) {
    matrix3[0] = vector2.x;
    matrix3[4] = vector2.y;
}

function multiply(matrix3a, matrix3b, matrix3c) {
    const a00 = matrix3a[0];
    const a01 = matrix3a[1];
    const a02 = matrix3a[2];
    const a10 = matrix3a[3];
    const a11 = matrix3a[4];
    const a12 = matrix3a[5];
    const a20 = matrix3a[6];
    const a21 = matrix3a[7];
    const a22 = matrix3a[8];
    const b00 = matrix3b[0];
    const b01 = matrix3b[1];
    const b02 = matrix3b[2];
    const b10 = matrix3b[3];
    const b11 = matrix3b[4];
    const b12 = matrix3b[5];
    const b20 = matrix3b[6];
    const b21 = matrix3b[7];
    const b22 = matrix3b[8];

    matrix3c[0] = b00 * a00 + b01 * a10 + b02 * a20;
    matrix3c[1] = b00 * a01 + b01 * a11 + b02 * a21;
    matrix3c[2] = b00 * a02 + b01 * a12 + b02 * a22;
    matrix3c[3] = b10 * a00 + b11 * a10 + b12 * a20;
    matrix3c[4] = b10 * a01 + b11 * a11 + b12 * a21;
    matrix3c[5] = b10 * a02 + b11 * a12 + b12 * a22;
    matrix3c[6] = b20 * a00 + b21 * a10 + b22 * a20;
    matrix3c[7] = b20 * a01 + b21 * a11 + b22 * a21;
    matrix3c[8] = b20 * a02 + b21 * a12 + b22 * a22;
}

export const m3 = {
    get components() { return 9; },
    create,
    createOrthographic,
    setIdentity,
    setTranslation,
    setRotation,
    setScale,
    multiply
};
