import { start, stop } from '../../application/host';
import { addEventListener } from '../../application/aliases';
import { createCanvas3dContext, applyOptionsAndExtensions } from './context';
import { restoreShader } from './handles/shaders';
import { restoreProgram } from './handles/programs';
import { restoreBuffer } from './handles/buffers';
import { restoreTexture } from './handles/textures';

addEventListener('webglcontextlostevent', contextLost);
addEventListener('webglcontextrestored', contextRestored);
addEventListener('webglcontextcreationerror', contextCreationError);

const contexts = new Map();

export function createManagedVideoContext(options) {
    let context = createCanvas3dContext(options);
    context.shaders = new Set();
    context.programs = new Set();
    context.buffers = new Set();
    context.textures = new Set();
    contexts.set(context);
    return context;
}

function contextLost() {
    stop();
}

function contextRestored() {
    for (const context of contexts) {
        applyOptionsAndExtensions(context);
        context.shaders.forEach(shader => restoreShader(shader, context));
        context.programs.forEach(program => restoreProgram(program, context));
        context.buffers.forEach(buffer => restoreBuffer(buffer, context));
        context.textures.forEach(texture => restoreTexture(texture, context));
    }

    start();
}

function contextCreationError() {
}
