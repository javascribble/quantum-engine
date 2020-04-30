import { loadImage } from '../formats/image';

export default (engine) => {
    const loaders = engine.loaders;
    loaders.png = loadImage;
    //loaders.obj = engine.loadText;
    //loaders.mtl = engine.loadText;
    //loaders.glsl = engine.loadText;
    //loaders.spv = async (url) => new Uint32Array(await engine.loadArrayBuffer(url));
};