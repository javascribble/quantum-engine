import { loadResource } from '../../../engine/main';

export const loadTexture = async (resource) => {
    const textureResource = await loadResource(resource);

    const sprites = [];
    for (const sprite of textureResource.sprites) {
        const image = await loadResource(textureResource.image);
        const imageBitmap = await loadImageBitmap(image, sprite);
        sprites.push({ name: sprite.name, imageBitmap });
    }

    return {
        sprites
    }
}

const loadImageBitmap = (image, options) => createImageBitmap(image, options.x, options.y, options.w, options.h);
