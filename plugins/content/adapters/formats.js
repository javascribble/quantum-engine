import { loadImage } from '../formats/image';

export default (engine) => {
    const loaders = engine.loaders;
    loaders.png = loadImage;
};