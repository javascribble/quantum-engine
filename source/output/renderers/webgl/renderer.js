import { resizeContext } from './context';
import { createManagedWebGLContext } from './manager';
import { useProgram } from './handles/programs';
import { bindBuffer, bufferData } from './handles/buffers';
import { bindTexture, bufferTexture } from './handles/textures';

export function createWebGLRenderer(renderables, options) {
    const state = {};
    const context = createManagedWebGLContext();
    return function renderWebGLContext(deltaTime) {
        resizeContext(context, options.scale);
        context.clear(context.DEPTH_BUFFER_BIT);
        for (const property in renderables) {
            let pass = strategy[property];
            let program = pass.program;
            if (state.program !== program) {
                useProgram(program, context);
                state.program = program;
                state.bind = true;
            }

            for (const uniform of program.uniforms) {
                if (state.bind || uniform.changed) {
                    program[uniform.name](uniform.value);
                    uniform.changed = false;
                }
            }

            for (const buffer of pass.buffers) {
                if (state.bind) {
                    bindBuffer(buffer, context);
                    for (const attribute of buffer.attributes) {
                        program[attribute.name](attribute);
                    }
                }

                if (buffer.changed) {
                    bufferData(buffer, context);
                    buffer.changed = false;
                }
            }

            if (state.bind) {
                for (const texture of pass.textures) {
                    texture.unit = 0;// TODO: Put this in the right place.
                    bindTexture(texture, context);
                    if (texture.changed) {
                        bufferTexture(texture, context);
                        texture.changed = false;
                    }
                }
            }

            state.bind = false;
            pass.draw();
        }
    }
}
