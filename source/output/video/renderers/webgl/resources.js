import { loadResource, loadResources } from "../../../../network/resources";

export async function loadResourceGroup(resourceGroup) {
    if (resourceGroup.audio) {
        let audioResources = resourceGroup.audio;
    }

    if (resourceGroup.video) {
        let videoResources = resourceGroup.video;
        await loadResources(videoResources.programs, loadProgram);
        await loadResources(videoResources.buffers, loadBuffer);
        await loadResources(videoResources.textures, loadTexture);
    }
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