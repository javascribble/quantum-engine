import { Engine } from '../elements/engine.js';

Engine.plugins.add(api => {
    api.importUniformSpritesheet = (image, sw, sh = sw) => {
        const sprites = [];
        for (let row = 0; row < image.height / sh; row++) {
            for (let column = 0; column < image.width / sw; column++) {
                sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
            }
        }

        return sprites;
    };

    api.attachSystem({
        validate: entity => 'map' in entity,
        construct: entity => {
            const { map, indices, divisor } = entity;
            const { sheet, size } = map;

            const tiles = [];
            const sprites = api.importUniformSpritesheet(sheet, size);
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
        destruct: entity => {
            for (const tile of entity.tiles) {
                api.detachEntity(tile);
            }
        }
    });
});