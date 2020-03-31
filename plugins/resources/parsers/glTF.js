import { loadResource, loadResources } from '../../../engine/main';

export const parseGltf = async (resource) => {
    return resource;
};

// const loadSceneResources = async (resources) => {
//     resources.passes = await loadResources(resources.passes);
//     resources.shaders = await loadResources(resources.shaders);
//     resources.layouts = await loadResources(resources.layouts, loadLayout);
//     resources.programs = await loadResources(resources.programs, loadProgram);
//     resources.buffers = await loadResources(resources.buffers);
//     resources.textures = await loadResources(resources.textures, loadTexture);
// };
