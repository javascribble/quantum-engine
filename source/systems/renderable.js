import { registerSystem } from '../application/architecture';
import { renderableComponent } from '../components/renderable';
import { m3 } from '../geometry/matrix3';

export async function registerRenderableSystem() {
    const renderables = new Set();
    function updateRenderables(deltaTime) {
        for(const renderable of renderables) {
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