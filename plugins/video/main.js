import { plugins, updates, systems } from '../../engine/main';
import { createRenderableSystem } from './systems/renderable';
import { createRendererSystem } from './systems/renderer';

const defaultVideoOptions = {
    scale: devicePixelRatio,
    parent: document.body
};

plugins.video = async (videoOptions) => {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const options = {
        ...defaultVideoOptions,
        ...videoOptions,
        device
    };

    const renderableSystem = createRenderableSystem(options);
    const rendererSystem = await createRendererSystem(options);
    updates.push(renderableSystem.update);
    updates.push(rendererSystem.update);
    systems.add(renderableSystem);
    systems.add(rendererSystem);
};