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

    programResource.vertexShader = {
        source: await loadResource(programResource.vertexShader)
    };

    programResource.fragmentShader = {
        source: await loadResource(programResource.fragmentShader)
    };

    return programResource;
}

async function loadBuffer(resource) {
    const bufferResource = await loadResource(resource);
    bufferResource.data = new Float32Array(bufferResource.data);
    return bufferResource;
}

async function loadTexture(resource) {
    const textureResource = await loadResource(resource);
    textureResource.data = await loadResource(textureResource.data);
    return textureResource;
}