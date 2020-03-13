import { loadResource } from '../network/resources';
import { loadVideoResources } from './renderers/webgl/resources';

export async function loadScene(resource) {
    const scene = await loadResource(resource);
    await loadVideoResources(scene.resources);
    return scene;
}
