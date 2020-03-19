export function getAttributeSetter(context, location, type) {
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
