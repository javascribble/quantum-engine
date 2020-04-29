import { loadImage } from './image';

export const initializeFormats = async (engine) => {
    engine.loaders.png = loadImage;
};