import { load } from '../systems/loader';

const loadImage = async (resource) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = resource;
    });
};

const loadImageBitmap = (image, options) => createImageBitmap(image, options.x, options.y, options.w, options.h);

export const loadTexture = async (resource) => {
    const textureResource = await load(resource);

    const sprites = [];
    for (const sprite of textureResource.sprites) {
        const image = await load(textureResource.image);
        const imageBitmap = await loadImageBitmap(image, sprite);
        sprites.push({ name: sprite.name, imageBitmap });
    }

    return {
        sprites
    }
}
