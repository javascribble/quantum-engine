import { applyShader, deleteShader } from './handles/shaders';
import { applyProgram, deleteProgram } from './handles/programs';
import { applyBuffer, deleteBuffer } from './handles/buffers';
import { applyTexture, deleteTexture } from './handles/textures';

export function allocateVideoHandles(video, resources) {
    applyHandles(video.context, video.resources, resources.programs, applyProgramAndShaders);
    applyHandles(video.context, video.resources, resources.buffers, applyBuffer);
    applyHandles(video.context, video.resources, resources.textures, applyTexture);
}

export function deallocateVideoHandles(video, resources) {
    deleteHandles(video.context, video.resources, resources.programs, deleteProgramAndShaders);
    deleteHandles(video.context, video.resources, resources.buffers, deleteBuffer);
    deleteHandles(video.context, video.resources, resources.textures, deleteTexture);
}

function applyHandles(context, activeResources, newResources, applicationMethod) {
    for (const resourceName in newResources) {
        if (activeResources.hasOwnProperty(resourceName)) {
            activeResources[resourceName].references++;
        } else {
            let newResource = {
                ...newResources[resourceName],
                references: 1
            };
            
            applicationMethod(newResource, context);
            activeResources[resourceName] = newResource;
        }
    }
}

function deleteHandles(context, activeResources, deletedResources, deletionMethod) {
    for (const resourceName in deletedResources) {
        let activeResource = activeResources[resourceName];
        if (activeResource.references-- === 0) {
            deletionMethod(activeResource, context);
            delete activeResources[resourceName];
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