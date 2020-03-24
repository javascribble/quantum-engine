import { start, stop, addListener } from '../imports';
import { restoreShader } from '../handles/shaders';
import { restoreProgram } from '../handles/programs';
import { restoreBuffer } from '../handles/buffers';
import { restoreTexture } from '../handles/textures';
import { createWebGLContext, applyOptionsAndExtensions } from './context';

const contexts = new Map();

export const createManagedWebGLContext = (options) => {
    const context = createWebGLContext(options);
    context.shaders = new Set();
    context.programs = new Set();
    context.buffers = new Set();
    context.textures = new Set();
    contexts.set(context);
    return context;
};

const contextLost = () => stop();

const contextRestored = () => {
    for (const context of contexts) {
        applyOptionsAndExtensions(context);
        context.shaders.forEach(shader => restoreShader(shader, context));
        context.programs.forEach(program => restoreProgram(program, context));
        context.buffers.forEach(buffer => restoreBuffer(buffer, context));
        context.textures.forEach(texture => restoreTexture(texture, context));
    }

    start();
};

const contextCreationError = () => {
};

addListener('webglcontextlostevent', contextLost);
addListener('webglcontextrestored', contextRestored);
addListener('webglcontextcreationerror', contextCreationError);