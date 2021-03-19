export const setTranslationMatrix4 = (m4, v3) => {
    m4[12] = v3.x;
    m4[13] = v3.y;
    m4[14] = v3.z;
};

export const setRotationMatrix4 = (m4, v3) => {
    // TODO: 3d rotation.
    const s = Math.sin(v3.z);
    const c = Math.cos(v3.z);
    m4[0] = c;
    m4[1] = s;
    m4[4] = -s;
    m4[5] = c;
};

export const setScaleMatrix4 = (m4, v3) => {
    m4[0] = v3.x;
    m4[5] = v3.y;
    m4[10] = v3.z;
};