const components = 3;

const create = (type = Float32Array) => {
    const v3 = new type(components);
    setIdentity(v3);
    return v3;
}

const setIdentity = (v3) => {
    v3[0] = 0;
    v3[1] = 0;
    v3[2] = 0;
}

const add = (v3a, v3b, v3c = create()) => {
    v3c[0] = v3a[0] + v3b[0];
    v3c[1] = v3a[1] + v3b[1];
    v3c[2] = v3a[2] + v3b[2];
    return v3c;
}

const subtract = (v3a, v3b, v3c = create()) => {
    v3c[0] = v3a[0] - v3b[0];
    v3c[1] = v3a[1] - v3b[1];
    v3c[2] = v3a[2] - v3b[2];
    return v3c;
}

const multiply = (v3a, v3b, v3c = create()) => {
    v3c[0] = v3a[0] * v3b[0];
    v3c[1] = v3a[1] * v3b[1];
    v3c[2] = v3a[2] * v3b[2];
    return v3c;
}

const divide = (v3a, v3b, v3c = create()) => {
    v3c[0] = v3a[0] / v3b[0];
    v3c[1] = v3a[1] / v3b[1];
    v3c[2] = v3a[2] / v3b[2];
    return v3c;
}

const normalize = (v3a, v3b = v3a) => {
    const m = 1 / Math.hypot(v3a[0], v3a[1], v3a[2]);
    v3a[0] *= m;
    v3a[1] *= m;
    v3a[2] *= m;
    return v3b;
}

const crossProduct = (v3a, v3b, v3c = create()) => {
    v3c[0] = v3a[1] * v3b[2] - v3a[2] * v3b[1];
    v3c[1] = v3a[2] * v3b[0] - v3a[0] * v3b[2];
    v3c[2] = v3a[0] * v3b[1] - v3a[1] * v3b[0];
    return v3c;
}

const dotProduct = (v3a, v3b) => v3a[0] * v3b[0] + v3a[1] * v3b[1] + v3a[2] * v3b[2];

const distance = (v3a, v3b) => Math.sqrt(distanceSquared(v3a, v3b));

const distanceSquared = (v3a, v3b) => Math.pow(v3a[0] - v3b[0], 2) + Math.pow(v3a[1] - v3b[1], 2) + Math.pow(v3a[2] - v3b[2], 2);

export const vector3 = {
    components,
    create,
    setIdentity,
    add,
    subtract,
    multiply,
    divide,
    normalize,
    crossProduct,
    dotProduct,
    distance,
    distanceSquared
};