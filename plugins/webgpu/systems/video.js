import { createCanvas, getWebGPUContext, setElementParent, registerSystem, defaultVideoOptions } from '../imports';
import { spriteComponent } from '../components/sprite';
import { createRenderer } from '../graphics/renderer';

export const registerVideoSystem = async (options = defaultVideoOptions) => {
    const canvas = createCanvas();
    setElementParent(canvas, options.parent);

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const context = getWebGPUContext(canvas);

    const renderer = await createRenderer(device, canvas, context, options);

    // TODO: Make scene an entity rather than a component.
    registerSystem('scene', renderer.renderables, renderer.render);

    const renderables = new Set();
    const updateRenderables = (deltaTime) => {
        let index = 0;
        let firstChangedRenderable = null;
        for (const renderable of renderables) {
            const transform = renderable.transform;
            if (transform.changed) {
                const buffer = renderable.buffer;
                copy(transform, buffer.data, renderable.index * 6);
                transform.changed = false;
                buffer.changed = true;

                if (index < renderables.size && !firstChangedRenderable) {
                    firstChangedRenderable = renderable;
                    buffer.offset = index;
                }

                index++;
            }
        }

        if (firstChangedRenderable) {
            //renderables.delete(firstChangedRenderable);
            //renderables.add(firstChangedRenderable);
        }
    }

    registerSystem(spriteComponent, renderables, updateRenderables);
}

const copy = (transform, array, index) => {
    // TODO: Only multiply the parts that have changed.
    const translation = transform.translation;
    const rotation = transform.rotation;
    const scale = transform.scale;
    array.set([translation.x, translation.y, rotation.z, scale.x, scale.y, translation.z], index);

    // const sin = Math.sin(rotation.z);
    // const cos = Math.cos(rotation.z);
    // array.set([cos * scale.x, sin * scale.x, 0, -sin * scale.y, cos * scale.y, 0, translation.x, translation.y, 1], index);

    // const translation = m4.create();
    // const rotation = m4.create();
    // const scale = m4.create();
    // m4.setTranslation(translation, transform.translation);
    // m4.setRotation(rotation, transform.rotation);
    // m4.setScale(scale, transform.scale);

    // const transformation = m4.create();
    // m4.multiply(translation, rotation, transformation);
    // m4.multiply(transformation, scale, transformation);

    // array.set(transformation, index);
}