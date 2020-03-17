import { loadResource } from '../imports';
import { loadVideoResources } from '../renderer/resources';

export async function loadScene(resource) {
    const scene = await loadResource(resource);
    await loadVideoResources(scene.resources);
    return scene;
}
