import { loadResource, loadText, loadArrayBuffer, resourceOptions } from '../imports';

resourceOptions.extensions.spv = loadSPIRVShader;
resourceOptions.extensions.glsl = loadText;

async function loadSPIRVShader(resource) {
    return new Uint32Array(await loadArrayBuffer(resource));
}