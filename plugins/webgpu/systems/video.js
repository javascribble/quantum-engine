import { updates, systems, createRenderingCanvas } from '../../../engine/main';
import { createRenderableSystem } from './renderable';
import { createRendererSystem } from './renderer';

export const defaultVideoSystemOptions = {
    getCanvas: createRenderingCanvas
}

export const registerVideoSystem = async (options = defaultVideoSystemOptions) => {
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
