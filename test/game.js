export default async api => {
    api.calculateTilemap = (tiles, divisor) => {
        for (let index = 0; index < tiles.length; index++) {
            const tile = tiles[index];
            tile.dx = tile.sw * (index % divisor);
            tile.dy = tile.sh * Math.floor(index / divisor);
            tile.dw = tile.sw;
            tile.dh = tile.sh;
        }
    };

    api.importUniformTilesheet = (image, sw, sh = sw) => {
        const sprites = [];
        for (let row = 0; row < image.height / sh; row++) {
            for (let column = 0; column < image.width / sw; column++) {
                sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
            }
        }

        return sprites;
    };

    api.attachSystem({
        validate: entity => 'player' in entity,
        update: (entities, time) => {
            for (const entity of entities) {
                if (api.getButton('ArrowUp')) {
                    entity.dy -= 5;
                } else if (api.getButton('ArrowDown')) {
                    entity.dy += 5;
                } else if (api.getButton('ArrowLeft')) {
                    entity.dx -= 5;
                } else if (api.getButton('ArrowRight')) {
                    entity.dx += 5;
                }
            }
        }
    });

    api.attachSystem({
        validate: entity => 'image' in entity,
        update: (entities, time) => {
            for (const entity of entities) {
                api.drawSprite(entity);
            }
        }
    });

    api.attachSystem({
        validate: entity => 'map' in entity,
        construct: entity => {
            const tiles = [];
            const divisor = entity.divisor;
            const grassTile = entity.children[0];
            for (let i = 0; i < divisor; i++) {
                for (let ii = 0; ii < divisor; ii++) {
                    const grassTileClone = { ...grassTile };
                    api.attachEntity(grassTileClone);
                    tiles.push(grassTileClone);
                }
            }

            api.calculateTilemap(tiles, divisor);
        }
    });
};