import { Engine } from '../elements/engine.js';

const importUniformSpritesheet = (image, sw, sh = sw) => {
    const sprites = [];
    for (let row = 0; row < image.height / sh; row++) {
        for (let column = 0; column < image.width / sw; column++) {
            sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
        }
    }

    return sprites;
};

Engine.plugins.add(api => {
    api.attachSystem({
        validate: entity => 'tileset' in entity,
        add: entity => {
            const { tileset, indices, divisor } = entity;
            const { sheet, size } = tileset;

            const tiles = [];
            const sprites = importUniformSpritesheet(sheet, size);
            for (let index = 0; index < indices.length; index++) {
                const tile = { ...sprites[indices[index]] };
                tile.dx = tile.sw * (index % divisor);
                tile.dy = tile.sh * Math.floor(index / divisor);
                tile.dw = tile.sw;
                tile.dh = tile.sh;
                tiles.push(tile);

                api.attachEntity(tile);
            }

            entity.tiles = tiles;
        },
        remove: entity => {
            for (const tile of entity.tiles) {
                api.detachEntity(tile);
            }
        }
    });
});