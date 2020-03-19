import { loadText, loadArrayBuffer, resourceOptions } from '../imports';

const loadSPIRVShader = async (resource) => new Uint32Array(await loadArrayBuffer(resource));

resourceOptions.extensions.spv = loadSPIRVShader;
resourceOptions.extensions.glsl = loadText;