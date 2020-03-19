const components = 9;

const create = (type = Float32Array) => {
    const m3 = new type(components);
    setIdentity(m3);
    return m3;
};

const orthographic = (width = 100, height = 100) => {
    const m3 = create();
    m3[0] = 2 / width;
    m3[4] = 2 / height;
    m3[6] = -1;
    m3[7] = -1;
    return m3;
}

const setIdentity = (m3) => {
    m3[0] = 1;
    m3[1] = 0;
    m3[2] = 0;
    m3[3] = 0;
    m3[4] = 1;
    m3[5] = 0;
    m3[6] = 0;
    m3[7] = 0;
    m3[8] = 1;
}

const setTranslation = (m3, v2) => {
    m3[6] = v2[0];
    m3[7] = v2[1];
}

const setRotation = (m3, radians) => {
    const s = Math.sin(radians);
    const c = Math.cos(radians);
    m3[0] = c;
    m3[1] = -s;
    m3[3] = s;
    m3[4] = c;
}

const setScale = (m3, v2) => {
    m3[0] = v2[0];
    m3[4] = v2[1];
}

const multiply = (m3a, m3b, m3c) => {
    const a00 = m3a[0];
    const a01 = m3a[1];
    const a02 = m3a[2];
    const a10 = m3a[3];
    const a11 = m3a[4];
    const a12 = m3a[5];
    const a20 = m3a[6];
    const a21 = m3a[7];
    const a22 = m3a[8];
    const b00 = m3b[0];
    const b01 = m3b[1];
    const b02 = m3b[2];
    const b10 = m3b[3];
    const b11 = m3b[4];
    const b12 = m3b[5];
    const b20 = m3b[6];
    const b21 = m3b[7];
    const b22 = m3b[8];

    m3c[0] = b00 * a00 + b01 * a10 + b02 * a20;
    m3c[1] = b00 * a01 + b01 * a11 + b02 * a21;
    m3c[2] = b00 * a02 + b01 * a12 + b02 * a22;
    m3c[3] = b10 * a00 + b11 * a10 + b12 * a20;
    m3c[4] = b10 * a01 + b11 * a11 + b12 * a21;
    m3c[5] = b10 * a02 + b11 * a12 + b12 * a22;
    m3c[6] = b20 * a00 + b21 * a10 + b22 * a20;
    m3c[7] = b20 * a01 + b21 * a11 + b22 * a21;
    m3c[8] = b20 * a02 + b21 * a12 + b22 * a22;
}

export const matrix3 = {
    components,
    create,
    orthographic,
    setIdentity,
    setTranslation,
    setRotation,
    setScale,
    multiply
};
