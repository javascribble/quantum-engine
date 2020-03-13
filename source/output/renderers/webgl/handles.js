import { applyShader, deleteShader } from './handles/shaders';
import { applyProgram, deleteProgram } from './handles/programs';
import { applyBuffer, deleteBuffer } from './handles/buffers';
import { applyTexture, deleteTexture } from './handles/textures';

export function allocateHandles(context, cache, resources) {
    applyHandles(context, cache, resources.programs, applyProgramAndShaders);
    applyHandles(context, cache, resources.buffers, applyBuffer);
    applyHandles(context, cache, resources.textures, applyTexture);
}

export function deallocateHandles(context, cache, resources) {
    deleteHandles(context, cache, resources.programs, deleteProgramAndShaders);
    deleteHandles(context, cache, resources.buffers, deleteBuffer);
    deleteHandles(context, cache, resources.textures, deleteTexture);
}

function applyHandles(context, cache, resources, applicationMethod) {
    for (const resourceName in resources) {
        if (cache.hasOwnProperty(resourceName)) {
            cache[resourceName].references++;
        } else {
            let newResource = {
                ...resources[resourceName],
                references: 1
            };
            
            applicationMethod(newResource, context);
            cache[resourceName] = newResource;
        }
    }
}

function deleteHandles(context, cache, resources, deletionMethod) {
    for (const resourceName in resources) {
        const activeResource = cache[resourceName];
        if (activeResource.references-- === 0) {
            deletionMethod(activeResource, context);
            delete cache[resourceName];
        }
    }
}

function applyProgramAndShaders(program, context) {
    program.vertexShader.type = context.VERTEX_SHADER;
    program.fragmentShader.type = context.FRAGMENT_SHADER;
    applyShader(program.vertexShader, context);
    applyShader(program.fragmentShader, context);
    applyProgram(program, context);
}

function deleteProgramAndShaders(program, context) {
    deleteShader(program.vertexShader, context);
    deleteShader(program.fragmentShader, context);
    deleteProgram(program, context);
}