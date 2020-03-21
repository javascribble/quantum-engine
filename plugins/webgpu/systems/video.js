import { createCanvas, getWebGPUContext, setElementParent, registerSystem, defaultVideoOptions } from '../imports';
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
}