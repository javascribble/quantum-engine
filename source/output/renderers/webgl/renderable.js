import { allocateHandles, deallocateHandles } from './handles';
import { convertDegreesToRadians } from '../../../geometry/angles';
import { createTransform2d } from '../../../components/transform';
import { createRenderable } from '../../../components/renderable';
import { createEntity } from '../../../application/architecture';
import { m3 } from '../../../geometry/matrix3';

export function createWebGLRenderable(context) {
    const passes = [];
    const resources = {};
    return {
        passes,
        add(scene) {
            allocateHandles(context, resources, scene.resources);
            testRenderer(context, passes, resources, scene.entities);
        },
        delete(scene) {
            deallocateHandles(context, resources, scene);
        }
    };
}

function testRenderer(context, passes, resources, entities) {
    const count = 10000;
    const components = m3.components;
    resources.dynamicBuffer.data = new Float32Array(components * count);
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
        const transform = createTransform2d();
        transform.translation.x = Math.random() * 100;
        transform.translation.y = Math.random() * 100;
        transform.translation.z = Math.random() - 1;
        transform.rotation.z = convertDegreesToRadians(45);
        transform.scale.x = 2;//Math.random() * 2;
        transform.scale.y = 2;//Math.random() * 2;
        transform.changed = true;

        const renderable = createRenderable(transform, resources.dynamicBuffer, i);

        const entity = createEntity();
        entity.transform = transform;
        entity.renderable = renderable;        
    }

    resources.dynamicBuffer.changed = true;
}