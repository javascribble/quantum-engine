export function getUniformSetter(context, location, type) {
    switch (type) {
        case context.INT: return encloseUniformSetter(context.uniform1i.bind(context), location);
        case context.FLOAT: return encloseUniformSetter(context.uniform1fv.bind(context), location);
        case context.FLOAT_VEC2: return encloseUniformSetter(context.uniform2fv.bind(context), location);
        case context.FLOAT_MAT3: return encloseUniformSetter(context.uniformMatrix3fv.bind(context), location, true);
        case context.FLOAT_MAT4: return encloseUniformSetter(context.uniformMatrix4fv.bind(context), location, true);
        case context.SAMPLER_2D: return encloseUniformSetter(context.uniform1i.bind(context), location);
    }
}

function encloseUniformSetter(setter, location, matrix) {
    return matrix ? (value) => setter(location, false, value) : (value) => setter(location, value);
}