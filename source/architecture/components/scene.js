import { loadResource } from '../../network/resources';
import { loadAudioResources } from '../../output/audio';
import { loadVideoResources } from '../../output/video';

export async function loadScene(resource) {
    let scene = await loadResource(resource);
    await loadAudioResources(scene.resources);
    await loadVideoResources(scene.resources);
    return scene;
}
