import { loadResource, loadResources } from '../imports';

export const loadScene = async (resource) => {
    const scene = await loadResource(resource);
    await loadSceneResources(scene.resources);
    return scene;
}

const loadSceneResources = async (resources) => {
    resources.programs = await loadResources(resources.programs, loadProgram);
    resources.buffers = await loadResources(resources.buffers, loadBuffer);
    resources.textures = await loadResources(resources.textures, loadTexture);
}

const loadProgram = async (resource) => {
    const programResource = await loadResource(resource);

    programResource.vertexStage.module = await loadResource(programResource.vertexStage.module);
    programResource.fragmentStage.module = await loadResource(programResource.fragmentStage.module);

    for (const colorState of programResource.colorStates) {
        colorState.writeMask = GPUColorWrite[colorState.writeMask];
    }

    return programResource;
}

const loadBuffer = async (resource) => {
    const bufferResource = await loadResource(resource);
    return bufferResource;
}

const loadTexture = async (resource) => {
    const textureResource = await loadResource(resource);

    let usageFlag = 0;
    for (const textureUsage of textureResource.usage) {
        usageFlag |= GPUTextureUsage[textureUsage];
    }

    textureResource.usage = usageFlag;

    return textureResource;
}