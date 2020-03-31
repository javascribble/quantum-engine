import { loadResource, loadResources } from '../../../engine/main';
//import { getGPUShaderStageConstant, getGPUColorWriteConstant } from '../../webgpu/graphics/constants';

export const parseGltf = async (resource) => {
    const scene = await loadResource(resource);
    //await loadSceneResources(scene.resources);
    return scene;
};

// const loadSceneResources = async (resources) => {
//     resources.passes = await loadResources(resources.passes);
//     resources.shaders = await loadResources(resources.shaders);
//     resources.layouts = await loadResources(resources.layouts, loadLayout);
//     resources.programs = await loadResources(resources.programs, loadProgram);
//     resources.buffers = await loadResources(resources.buffers);
//     resources.textures = await loadResources(resources.textures, loadTexture);
// };

// const loadLayout = async (resource) => {
//     const layoutResource = await loadResource(resource);

//     for (const binding of layoutResource.bindings) {
//         binding.visibility = getGPUShaderStageConstant(binding.visibility);
//     }

//     return layoutResource;
// };

// const loadProgram = async (resource) => {
//     const programResource = await loadResource(resource);

//     for (const colorState of programResource.colorStates) {
//         colorState.writeMask = getGPUColorWriteConstant(colorState.writeMask);
//     }

//     return programResource;
// };