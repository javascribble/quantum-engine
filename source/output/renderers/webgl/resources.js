import { loadResource, loadResources } from "../network/resources";

export async function loadVideoResources(resources) {
    await loadResources(resources.programs, loadProgram);
    await loadResources(resources.buffers, loadBuffer);
    await loadResources(resources.textures, loadTexture);
}

export async function loadProgram(resource) {
    let programResource = await loadResource(resource);

    programResource.vertexShader = {
        source: await loadResource(programResource.vertexShader)
    };

    programResource.fragmentShader = {
        source: await loadResource(programResource.fragmentShader)
    };

    return programResource;
}

export async function loadBuffer(resource) {
    let bufferResource = await loadResource(resource);
    bufferResource.data = new Float32Array(bufferResource.data);
    return bufferResource;
}

export async function loadTexture(resource) {
    let textureResource = await loadResource(resource);
    textureResource.data = await loadResource(textureResource.data);
    return textureResource;
}