import { registerComponentSystemUpdate } from '../application/architecture';
import { createWebGPURenderer } from '../output/video';

export async function registerWebGPUSystem() {
    const renderer = createRenderer();

    const controller = {
        add: scene => addScene(renderer, scene),
        delete: scene => deleteScene(renderer, scene)
    };    
    
    function updateWebGPUSystem(deltaTime) {
        renderScenes(renderer, deltaTime);
    }

    registerComponentSystemUpdate('scene', controller, updateWebGPUSystem);
}
