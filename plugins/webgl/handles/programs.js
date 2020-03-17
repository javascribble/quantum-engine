export function createProgram(context, vertexShader, fragmentShader) {
    const program = {
        vertexShader,
        fragmentShader
    };

    applyProgram(program, context);
    return program;
}

export function applyProgram(program, context) {
    restoreProgram(program, context);
    context.programs.add(program);
}

export function restoreProgram(program, context) {
    const handle = program.handle = context.createProgram();
    context.attachShader(handle, program.vertexShader.handle);
    context.attachShader(handle, program.fragmentShader.handle);
    context.linkProgram(handle);
    if (!context.getProgramParameter(handle, context.LINK_STATUS)) {
        throw context.getProgramInfoLog(handle);
    }

    addAccessors(context, program, handle, context.ACTIVE_UNIFORMS, context.getActiveUniform, context.getUniformLocation, getUniformSetter);
    addAccessors(context, program, handle, context.ACTIVE_ATTRIBUTES, context.getActiveAttrib, context.getAttribLocation, getAttributeSetter);
}

export function useProgram(program, context) {
    context.useProgram(program.handle);
}

export function deleteProgram(program, context) {
    context.programs.delete(program);
    context.deleteProgram(program.handle);
}

function addAccessors(context, program, handle, memberType, accessMember, accessLocation, getSetter) {
    const members = context.getProgramParameter(handle, memberType);
    for (let i = 0; i < members; i++) {
        const member = accessMember.call(context, handle, i);
        const name = member.name;
        if (name) {
            program[name] = getSetter(context, accessLocation.call(context, handle, name), member.type);
        }
    }
}

function getUniformSetter(context, location, type) {
    switch (type) {
        case context.INT: return encloseUniformSetter(context.uniform1i.bind(context), location);
        case context.FLOAT: return encloseUniformSetter(context.uniform1fv.bind(context), location);
        case context.FLOAT_VEC2: return encloseUniformSetter(context.uniform2fv.bind(context), location);
        case context.FLOAT_MAT3: return encloseUniformSetter(context.uniformMatrix3fv.bind(context), location, true);
        case context.FLOAT_MAT4: return encloseUniformSetter(context.uniformMatrix4fv.bind(context), location, true);
        case context.SAMPLER_2D: return encloseUniformSetter(context.uniform1i.bind(context), location);
    }
}

function getAttributeSetter(context, location, type) {
    switch (type) {
        case context.INT: return encloseAttributeSetter(context, context.vertexAttribIPointer.bind(context), location, context.INT, 4, 1);
        case context.FLOAT: return encloseAttributeSetter(context, context.vertexAttribPointer.bind(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_VEC2: return encloseAttributeSetter(context, context.vertexAttribPointer.bind(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_VEC3: return encloseAttributeSetter(context, context.vertexAttribPointer.bind(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_VEC4: return encloseAttributeSetter(context, context.vertexAttribPointer.bind(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_MAT3: return encloseAttributeSetter(context, context.vertexAttribPointer.bind(context), location, context.FLOAT, 4, 3);
        case context.FLOAT_MAT4: return encloseAttributeSetter(context, context.vertexAttribPointer.bind(context), location, context.FLOAT, 4, 4);
    }
}

function encloseUniformSetter(setter, location, matrix) {
    return matrix ? (value) => setter(location, false, value) : (value) => setter(location, value);
}

function encloseAttributeSetter(context, setter, location, type, bytes, slots) {
    return function (attribute) {
        if (attribute.divisor) {
            for (let i = 0; i < slots; i++) {
                const incrementalLocation = location + i;
                context.enableVertexAttribArray(incrementalLocation);
                context.vertexAttribDivisor(incrementalLocation, attribute.divisor);
            }

            const attributeComponents = attribute.components / slots;
            const attributeOffset = attributeComponents * bytes;
            for (let i = 0; i < slots; i++) {
                setter(location + i, attributeComponents, type, false, attribute.stride, attribute.offset + i * attributeOffset);
            }
        } else {
            context.enableVertexAttribArray(location);
            setter(location, attribute.components, type, false, attribute.stride, attribute.offset);
        }
    };
}
