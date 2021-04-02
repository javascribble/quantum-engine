import { Engine } from '../../elements/engine.js';

const importUniformTiles = (image, width, height = width) => {
    const sprites = [];
    for (let row = 0; row < image.height / height; row++) {
        for (let column = 0; column < image.width / width; column++) {
            sprites.push({ image, sx: column * width, sy: row * height, sw: width, sh: height });
        }
    }

    return sprites;
};

Engine.plugins.add({
    load: engine => {
        engine.importUniformTiles = importUniformTiles;
    },
    unload: engine => {
        delete engine.importUniformTiles;
    }
});