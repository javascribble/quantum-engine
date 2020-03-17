import { m3 } from '../imports';
import { allocateHandles, deallocateHandles } from './handles';
import { createRenderable } from '../components/renderable';

export function createWebGLRenderable(context) {
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
