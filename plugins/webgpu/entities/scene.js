import { loadResource, loadResources } from '../imports';

export async function loadScene(resource) {
    const scene = await loadResource(resource);
    await loadSceneResources(scene.resources);
    return scene;
}

async function loadSceneResources(resources) {
    resources.programs = await loadResources(resources.programs, loadProgram);
    resources.buffers = await loadResources(resources.buffers, loadBuffer);
    resources.textures = await loadResources(resources.textures, loadTexture);
}

async function loadProgram(resource) {
    const programResource = await loadResource(resource);

    programResource.vertexStage.module = await loadResource(programResource.vertexStage.module);
    programResource.fragmentStage.module = await loadResource(programResource.fragmentStage.module);

    for (const colorState of programResource.colorStates) {
        colorState.writeMask = GPUColorWrite[colorState.writeMask];
    }

    return programResource;
}

async function loadBuffer(resource) {
    const bufferResource = await loadResource(resource);
    return bufferResource;
}

async function loadTexture(resource) {
    const textureResource = await loadResource(resource);
    
    let usageFlag = 0;
    for (const textureUsage of textureResource.usage) {
        usageFlag |= GPUTextureUsage[textureUsage];
    }

    textureResource.usage = usageFlag;

    return textureResource;
}