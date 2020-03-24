const components = 4;

const create = (type = Float32Array) => {
    const v4 = new type(components);
    setIdentity(v4);
    return v4;
};

const setIdentity = (v4) => {
    v4[0] = 0;
    v4[1] = 0;
    v4[2] = 0;
    v4[3] = 1;
};

export const vector4 = {
    components,
    create,
    setIdentity
};