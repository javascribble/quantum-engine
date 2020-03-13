import { createManagedWebGLContext } from './renderers/webgl/manager';
import { createWebGLRenderer } from './renderers/webgl/renderer';
import { createWebGLRenderable } from './renderers/webgl/renderable';
import { createWebGPUContext } from './renderers/webgpu/context';
import { createWebGPURenderer } from './renderers/webgpu/renderer';
import { createWebGPURenderable } from './renderers/webgpu/renderable';

export const defaultAudioOptions = {
}

export const defaultVideoOptions = {
    scale: devicePixelRatio,
    parent: document.body
}

export async function createWebGPUVideo(options = defaultVideoOptions) {    
    const context = await createWebGPUContext(options);
    const renderable = createWebGPURenderable(context);
    const render = createWebGPURenderer(context, renderable, options);
    return {
        renderable,
        render
    }
}

export function createWebGLVideo(options = defaultVideoOptions) {
    const context = createManagedWebGLContext(options);
    const renderable = createWebGLRenderable(context);
    const render = createWebGLRenderer(context, renderable, options);
    return { 
        renderable,
        render
    }
}
