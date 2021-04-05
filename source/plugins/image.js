import { Engine } from '../elements/engine.js';

const importUniformSprites = (image, width, height = width) => {
    const sprites = [];
    for (let row = 0; row < image.height / height; row++) {
        for (let column = 0; column < image.width / width; column++) {
            sprites.push({
                image,
                sx: column * width,
                sy: row * height,
                sw: width,
                sh: height,
                dx: -width / 2,
                dy: -height / 2,
                dw: width,
                dh: height
            });
        }
    }

    return sprites;
};

Engine.plugins.add({
    load: engine => {
        engine.importUniformSprites = importUniformSprites;
    },
    unload: engine => {
        delete engine.importUniformSprites;
    }
});