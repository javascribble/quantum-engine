import { updates, systems, createRenderingCanvas } from '../imports';
import { createVideoRenderableSystem } from './renderable';
import { createVideoRendererSystem } from './renderer';

export const defaultVideoSystemOptions = {
    getCanvas: createRenderingCanvas
}

export const registerVideoSystem = async (options = defaultVideoSystemOptions) => {
    const canvases = options.canvases || [options.getCanvas()];

    const renderableSystemOptions = {};
    const rendererSystemOptions = { canvases };

    const renderableSystem = createVideoRenderableSystem(renderableSystemOptions);
    const rendererSystem = await createVideoRendererSystem(rendererSystemOptions);
    updates.push(renderableSystem.update);
    updates.push(rendererSystem.update);
    systems.add(renderableSystem);
    systems.add(rendererSystem);
};
