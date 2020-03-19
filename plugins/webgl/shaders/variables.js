import { getAttributeSetter } from './attributes';
import { getUniformSetter } from './uniforms';

export function addVariables(context, program, handle) {
    addAccessors(context, program, handle, context.ACTIVE_UNIFORMS, context.getActiveUniform, context.getUniformLocation, getUniformSetter);
    addAccessors(context, program, handle, context.ACTIVE_ATTRIBUTES, context.getActiveAttrib, context.getAttribLocation, getAttributeSetter);
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