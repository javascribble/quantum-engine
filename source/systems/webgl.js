import { registerSystem } from '../application/architecture';
import { sceneComponent } from '../components/scene';
import { createWebGLVideo } from '../output/video';

export async function registerWebGLSystem() {
    const video = createWebGLVideo();
    registerSystem(sceneComponent, video.renderable, video.render);
}
