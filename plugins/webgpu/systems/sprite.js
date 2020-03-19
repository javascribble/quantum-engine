import { registerSystem } from '../imports';
import { createWebGPURenderer } from '../renderer/renderer';
import { createWebGPURenderable } from '../renderer/renderable';
import { createManagedWebGPUContext } from '../renderer/manager';

export async function registerSpriteSystem(options) {
    const context = await createManagedWebGPUContext(options);
    const renderable = await createWebGPURenderable(context);
    const render = createWebGPURenderer(context, renderable, options);

    // TODO: Make scene an entity rather than a component.
    registerSystem('scene', renderable, render);
}