import { registerComponentSystemUpdate } from '../application/architecture';
import { createWebGLVideo } from '../output/video';

export async function registerWebGLSystem() {
    const video = createWebGLVideo();
    setElementParent(video.canvas, document.body);
    registerComponentSystemUpdate('renderable', video.renderable, video.render);
}
