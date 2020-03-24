const components = 2;

const create = (type = Float32Array) => {
    const v2 = new type(components);
    setIdentity(v2);
    return v2;
};

const setIdentity = (v2) => {
    v2[0] = 0;
    v2[1] = 0;
};

const distance = (v2a, v2b) => Math.sqrt(getDistanceSquared(v2a, v2b));

const distanceSquared = (v2a, v2b) => Math.pow(v2a[0] - v2b[0], 2) + Math.pow(v2a[1] - v2b[1], 2);

const distanceSquaredNormalized = (v2a, v2b, v2c) => Math.pow(v2a[0] - v2b[0], 2) / Math.pow(v2c[0], 2) + Math.pow(v2a[1] - v2b[1], 2) / Math.pow(v2c[1], 2);

export const vector2 = {
    create,
    setIdentity,
    distance,
    distanceSquared,
    distanceSquaredNormalized
};