import { loadResource, loadResources } from '../imports';
import { getGPUShaderStageConstant, getGPUColorWriteConstant, getGPUTextureUsageConstant } from '../graphics/constants';

export const loadScene = async (resource) => {
    const scene = await loadResource(resource);
    await loadSceneResources(scene.resources);
    return scene;
};

const loadSceneResources = async (resources) => {
    resources.shaders = await loadResources(resources.shaders);
    resources.layouts = await loadResources(resources.layouts, loadLayout);
    resources.programs = await loadResources(resources.programs, loadProgram);
    resources.buffers = await loadResources(resources.buffers, loadBuffer);
    resources.textures = await loadResources(resources.textures, loadTexture);
};

const loadLayout = async (resource) => {
    const layoutResource = await loadResource(resource);

    for (const binding of layoutResource.bindings) {
        binding.visibility = getGPUShaderStageConstant(binding.visibility);
    }

    return layoutResource;
};

const loadProgram = async (resource) => {
    const programResource = await loadResource(resource);

    for (const colorState of programResource.colorStates) {
        colorState.writeMask = getGPUColorWriteConstant(colorState.writeMask);
    }

    return programResource;
};

const loadBuffer = async (resource) => {
    const bufferResource = await loadResource(resource);
    return bufferResource;
};

const loadTexture = async (resource) => {
    const textureResource = await loadResource(resource);

    let usageFlag = 0;
    for (const textureUsage of textureResource.usage) {
        usageFlag |= getGPUTextureUsageConstant(textureUsage);
    }

    textureResource.usage = usageFlag;

    return textureResource;
};