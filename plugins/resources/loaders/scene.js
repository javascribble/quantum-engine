import { loadResource, loadResources } from '../../../engine/main';

export const loadScene = async (resource) => {
    const scene = await loadResource(resource);
    return scene;
};
