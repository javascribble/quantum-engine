import { loadImage } from '../loaders/image';

export const initializeFormats = async (engine) => {
    engine.loaders.png = loadImage;
};