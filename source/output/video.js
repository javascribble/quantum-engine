import { createWebGLRenderer } from './renderers/webgl/renderer';
import { createWebGLRenderable } from './renderers/webgl/renderable';
// import { createWebGPURenderer } from './renderers/webgpu/renderer';
// import { createWebGPURenderable } from './renderers/webgpu/renderable';

export const defaultAudioOptions = {
}

export const defaultVideoOptions = {
    scale: devicePixelRatio
}

export function createWebGPUVideo() {

}

export function createWebGLVideo(options) {
    const renderable = createWebGLRenderable();
    const render = createWebGLRenderer(renderable, options);
    return { 
        renderable,
        render
    }
}
