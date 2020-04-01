import { plugins, updates, systems, assign } from '../imports';
import { createRenderableSystem } from './renderable';
import { createRendererSystem } from './renderer';
import { createCanvas } from '../api/canvas';

export const videoOptions = {
    getCanvas: createCanvas,
    scale: devicePixelRatio,
    parent: document.body
};

plugins.video = async (options) => {
    assign(videoOptions, options);

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