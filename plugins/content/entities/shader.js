import { loaders, loadText, loadArrayBuffer } from '../../../engine/main';

loaders.spv = async (url) => new Uint32Array(await loadArrayBuffer(url));
loaders.glsl = loadText;