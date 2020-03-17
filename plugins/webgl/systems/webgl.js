import { registerSystem, defaultVideoOptions } from '../imports';
import { createManagedWebGLContext } from '../renderer/manager';
import { createWebGLRenderable } from '../renderer/renderable';
import { createWebGLRenderer } from '../renderer/renderer';

export async function registerWebGLSystem(options = defaultVideoOptions) {
    const context = createManagedWebGLContext(options);
    const renderable = createWebGLRenderable(context);
    const render = createWebGLRenderer(context, renderable, options);
    registerSystem('scene', renderable, render);
}
