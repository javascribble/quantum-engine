import { plugins, updates, systems, assign, createCanvas } from '../../../engine/main';
import { createRenderableSystem } from './renderable';
import { createRendererSystem } from './renderer';

export const webGPUOptions = {
    getCanvas: createCanvas,
    scale: devicePixelRatio,
    parent: document.body
};

export const registerWebGPU = async (options) => {
    assign(webGPUOptions, options);

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const renderableSystemOptions = {
        device
    };

    const rendererSystemOptions = {
        canvases: options.canvases || [options.getCanvas()],
        device
    };

    const renderableSystem = createRenderableSystem(renderableSystemOptions);
    const rendererSystem = await createRendererSystem(rendererSystemOptions);
    updates.push(renderableSystem.update);
    updates.push(rendererSystem.update);
    systems.add(renderableSystem);
    systems.add(rendererSystem);
};

plugins.webgpu = registerWebGPU;