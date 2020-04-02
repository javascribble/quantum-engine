import { plugins, updates, systems } from '../../../engine/main';
import { createRenderableSystem } from './renderable';
import { createRendererSystem } from './renderer';
import { createCanvas } from '../api/canvas';

export const defaultVideoOptions = {
    getCanvas: createCanvas,
    scale: devicePixelRatio,
    parent: document.body
};

plugins.video = async (videoOptions) => {
    const options = {
        ...defaultVideoOptions,
        ...videoOptions
    };

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const renderableSystemOptions = {
        device
    };

    const rendererSystemOptions = {
        canvases: options.canvases || [options.getCanvas(options)],
        device
    };

    const renderableSystem = createRenderableSystem(renderableSystemOptions);
    const rendererSystem = await createRendererSystem(rendererSystemOptions);
    updates.push(renderableSystem.update);
    updates.push(rendererSystem.update);
    systems.add(renderableSystem);
    systems.add(rendererSystem);
};