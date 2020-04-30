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
