import { loadResource } from '../../../../network/resources';
import { loadResourceGroup } from './video/resources'
import { allocateVideoHandles, deallocateVideoHandles } from './video/handles'

export async function loadScene(resource) {
    let scene = await loadResource(resource);
    await loadResourceGroup(scene.resources);
    return scene;
}

export function createScene(scene, audio, video) {
    allocateVideoHandles(video, scene.resources.video);
}

export function deleteScene(scene, audio, video) {
    deallocateVideoHandles(video, scene.resources.video);
}
