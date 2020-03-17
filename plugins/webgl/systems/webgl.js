import { registerSystem, setElementParent, defaultVideoOptions, m3 } from '../imports';
import { createRenderable, renderableComponent } from '../components/renderable';
import { createManagedWebGLContext } from '../renderer/manager';
import { createWebGLRenderer } from '../renderer/renderer';
import { applyShader, deleteShader } from '../handles/shaders';
import { applyProgram, deleteProgram } from '../handles/programs';
import { applyBuffer, deleteBuffer } from '../handles/buffers';
import { applyTexture, deleteTexture } from '../handles/textures';

export async function registerWebGLSystem(options = defaultVideoOptions) {
    const context = createManagedWebGLContext(options);
    const renderable = createWebGLRenderable(context);
    setElementParent(context.canvas, options.parent);
    const render = createWebGLRenderer(context, renderable, options);

    // TODO: Make scene an entity rather than a component.
    registerSystem('scene', renderable, render);

    const renderables = new Set();
    function updateRenderables(deltaTime) {
        for (const renderable of renderables) {
            const transform = renderable.transform;
            if (transform.changed) {
                const buffer = renderable.buffer;
                copy(transform, buffer.data, renderable.index * m3.components);
                transform.changed = false;
                buffer.changed = true;
            }
        }
    }

    registerSystem(renderableComponent, renderables, updateRenderables);
}

function createWebGLRenderable(context) {
    const passes = [];
    const resources = {};
    return {
        passes,
        add(scene) {
            allocateHandles(context, resources, scene.resources);

            // TODO: Make this more flexible.
            const buffer = resources.dynamicBuffer;
            const entities = scene.entities;
            const count = entities.length;

            // TODO: This needs to be resized when an entity (not a scene) is deleted.
            resources.dynamicBuffer.data = new Float32Array(m3.components * count);
            resources.dynamicBuffer.changed = true;

            // TODO: This is hardcoded and should be replaced with a strategy that figures out render passes.
            passes.push({
                program: resources.defaultProgram,
                buffers: [
                    resources.staticBuffer,
                    resources.dynamicBuffer
                ],
                textures: [resources.defaultTexture],
                draw: () => context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, count)
            });

            for (let i = 0; i < count; i++) {
                const entity = entities[i];
                entity.renderable = createRenderable(entity.transform, resources.dynamicBuffer, i);
            }
        },
        delete(scene) {
            deallocateHandles(context, resources, scene.resources);
        }
    };
}

function allocateHandles(context, cache, resources) {
    applyHandles(context, cache, resources.programs, applyProgramAndShaders);
    applyHandles(context, cache, resources.buffers, applyBuffer);
    applyHandles(context, cache, resources.textures, applyTexture);
}

function deallocateHandles(context, cache, resources) {
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

function copy(transform, array, index) {
    // TODO: Only multiply the parts that have changed.
    const translation = transform.translation;
    const rotation = transform.rotation;
    const scale = transform.scale;
    const sin = Math.sin(rotation.z);
    const cos = Math.cos(rotation.z);
    array.set([cos * scale.x, sin * scale.x, 0, -sin * scale.y, cos * scale.y, 0, translation.x, translation.y, 1], index);
}

// function copy(transform, array, index) {
//     // TODO: Only multiply the parts that have changed.

//     const translation = m4.create();
//     const rotation = m4.create();
//     const scale = m4.create();
//     m4.setTranslation(translation, transform.translation);
//     m4.setRotation(rotation, transform.rotation);
//     m4.setScale(scale, transform.scale);

//     const transformation = m4.create();
//     m4.multiply(translation, rotation, transformation);
//     m4.multiply(transformation, scale, transformation);

//     array.set(transformation, index);
// }

// function addEntities() {
//     const componentCount = matrix3Components;
//     const componentSize = Float32Array.BYTES_PER_ELEMENT;
//     const renderableSize = componentCount * componentSize;

//     if (loadedResourceGroup.video.buffers.dynamicBuffer.resize) {
//         let array = new Float32Array(renderableSize * renderables.size);
//         array.set(loadedResourceGroup.video.buffers.dynamicBuffer.data);
//         loadedResourceGroup.video.buffers.dynamicBuffer.data = array;
//     }

//     let index = 0;
//     let firstChangedRenderable = null;
//     for (const renderable of renderables) {
//         if (renderable.changed) {
//             copyTransform2(renderable.transform, loadedResourceGroup.video.buffers.dynamicBuffer.data, index * renderableSize);
//             renderable.changed = false;
//             if (index < renderables.size && !firstChangedRenderable) {
//                 firstChangedRenderable = renderable;
//                 loadedResourceGroup.video.buffers.dynamicBuffer.offset = index;
//             }
//         }

//         index++;
//     }

//     if (firstChangedRenderable) {
//         renderables.delete(firstChangedRenderable);
//         renderables.add(firstChangedRenderable);
//     }
// }