import { allocateHandles, deallocateHandles } from './handles';
import { convertDegreesToRadians } from '../../../geometry/angles';
import { createTransform2d } from '../../../components/transform';
import { m3 } from '../../../geometry/matrix3';

export function createWebGLRenderable(context) {
    const strategy = {};
    const resources = {};
    return {
        strategy,
        add(scene) {
            allocateHandles(context, resources, scene.resources);
            testRenderer(context, strategy, resources, scene.entities);
        },
        delete(scene) {
            deallocateHandles(context, resources, scene);
        }
    };
}

function testRenderer(context, strategy, resources, entities) {
    const count = 10;
    const components = m3.components;
    resources.dynamicBuffer.data = new Float32Array(components * count);
    strategy.defaultPass = {
        program: resources.defaultProgram,
        buffers: [
            resources.staticBuffer,
            resources.dynamicBuffer
        ],
        textures: [resources.defaultTexture],
        draw: () => context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, count)
    };

    for (let i = 0; i < count; i++) {
        const transform = createTransform2d();
        transform.translation.x = Math.random() * 100;
        transform.translation.y = Math.random() * 100;
        transform.translation.z = Math.random() - 1;
        transform.rotation.z = convertDegreesToRadians(45);
        transform.scale.x = 2;//Math.random() * 2;
        transform.scale.y = 2;//Math.random() * 2;
        transform.changed = true;

        // const entity = createEntity();
        // entity.transform = transform;
        // entity.renderable = {
        //     program: resources.defaultProgram,
        //     staticBuffer: resources.staticBuffer,
        //     dynamicBuffer: resources.dynamicBuffer,
        //     texture: resources.defaultTexture,
        //     index: i
        // };

        copy(transform, resources.dynamicBuffer.data, i * m3.components);
    }

    resources.dynamicBuffer.changed = true;
    function copy(transform, array, index) {
        // TODO: Only multiply the parts that have changed.
        const translation = transform.translation;
        const rotation = transform.rotation;
        const scale = transform.scale;
        const sin = Math.sin(rotation.z);
        const cos = Math.cos(rotation.z);
        //array.set([translation.x, translation.y, translation.z, rotation.z, scale.x, scale.y], index);
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
}