import { registerSystem } from '../application/architecture';
import { sceneComponent } from '../components/scene';
import { createWebGPUVideo } from '../output/video';

export async function registerWebGPUSystem() {
    const video = await createWebGPUVideo();
    registerSystem(sceneComponent, video.renderable, video.render);
}
