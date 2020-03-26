import { resourceOptions } from '../imports';

const loadImage = async (resource) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);//resolve(loadSpriteSheet(image, resource.sprites));
        image.src = resource;
    });
};

const loadSpriteSheet = (sheet, sprites) => Promise.all(sprites.map(async sprite => ({ name: sprite.name, image: await loadImageBitmap(sheet, sprite) })));

const loadImageBitmap = (image, options) => createImageBitmap(image, options.x, options.y, options.w, options.h);

resourceOptions.extensions.png = loadImage;
