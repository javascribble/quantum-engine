const components = 2;

function create(type = Float32Array) {
    const v2 = new type(components);
    setIdentity(v2);
    return v2;
}

function setIdentity(v2) {
    v2[0] = 0;
    v2[1] = 0;
}

function distance(v2a, v2b) {
    return Math.sqrt(getDistanceSquared(v2a, v2b));
}

function distanceSquared(v2a, v2b) {
    return Math.pow(v2a[0] - v2b[0], 2) + Math.pow(v2a[1] - v2b[1], 2);
}

function distanceSquaredNormalized(v2a, v2b, v2c) {
    return Math.pow(v2a[0] - v2b[0], 2) / Math.pow(v2c[0], 2) + Math.pow(v2a[1] - v2b[1], 2) / Math.pow(v2c[1], 2);
}

export const vector2 = {
    create,
    setIdentity,
    distance,
    distanceSquared,
    distanceSquaredNormalized
};