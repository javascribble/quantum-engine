const components = 3;

function create(type = Float32Array) {
    const v3 = new type(components);
    setIdentity(v3);
    return v3;
}

function setIdentity(v3) {
    v3[0] = 0;
    v3[1] = 0;
    v3[2] = 0;
}

function add(v3a, v3b, v3c = create()) {
    v3c[0] = v3a[0] + v3b[0];
    v3c[1] = v3a[1] + v3b[1];
    v3c[2] = v3a[2] + v3b[2];
    return v3c;
}

function subtract(v3a, v3b, v3c = create()) {
    v3c[0] = v3a[0] - v3b[0];
    v3c[1] = v3a[1] - v3b[1];
    v3c[2] = v3a[2] - v3b[2];
    return v3c;
}

function multiply(v3a, v3b, v3c = create()) {
    v3c[0] = v3a[0] * v3b[0];
    v3c[1] = v3a[1] * v3b[1];
    v3c[2] = v3a[2] * v3b[2];
    return v3c;
}

function divide(v3a, v3b, v3c = create()) {
    v3c[0] = v3a[0] / v3b[0];
    v3c[1] = v3a[1] / v3b[1];
    v3c[2] = v3a[2] / v3b[2];
    return v3c;
}

function normalize(v3a, v3b = v3a) {
    const m = 1 / Math.hypot(v3a[0], v3a[1], v3a[2]);
    v3a[0] *= m;
    v3a[1] *= m;
    v3a[2] *= m;
    return v3b;
}

function crossProduct(v3a, v3b, v3c = create()) {
    v3c[0] = v3a[1] * v3b[2] - v3a[2] * v3b[1];
    v3c[1] = v3a[2] * v3b[0] - v3a[0] * v3b[2];
    v3c[2] = v3a[0] * v3b[1] - v3a[1] * v3b[0];
    return v3c;
}

function dotProduct(v3a, v3b) {
    return v3a[0] * v3b[0] + v3a[1] * v3b[1] + v3a[2] * v3b[2];
}

function distance(v3a, v3b) {
    return Math.sqrt(distanceSquared(v3a, v3b));
}

function distanceSquared(v3a, v3b) {
    return Math.pow(v3a[0] - v3b[0], 2) + Math.pow(v3a[1] - v3b[1], 2) + Math.pow(v3a[2] - v3b[2], 2);
}

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