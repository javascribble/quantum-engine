export default async (engine, options) => {
    engine.importUniformSpritesheet = (image, sw, sh = sw) => {
        const sprites = [];
        for (let row = 0; row < image.height / sh; row++) {
            for (let column = 0; column < image.width / sw; column++) {
                sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
            }
        }

        return sprites;
    };

    engine.attachSystem({
        validate: entity => 'map' in entity,
        construct: entity => {
            const { map, indices, divisor } = entity;
            const { sheet, size } = map;

            const tiles = [];
            const sprites = engine.importUniformSpritesheet(sheet, size);
            for (let index = 0; index < indices.length; index++) {
                const tile = { ...sprites[indices[index]] };
                tile.dx = tile.sw * (index % divisor);
                tile.dy = tile.sh * Math.floor(index / divisor);
                tile.dw = tile.sw;
                tile.dh = tile.sh;
                tiles.push(tile);
            }

            entity.tiles = tiles;
        },
        update: (entities, time) => {
            for (const entity of entities) {
                for (const tile of entity.tiles) {
                    engine.drawSprite(tile);
                }
            }
        }
    });

    engine.attachSystem({
        validate: entity => 'player' in entity,
        construct: entity => Object.assign(entity, entity.player),
        update: (entities, time) => {
            for (const entity of entities) {
                if (engine.getButton('ArrowUp')) {
                    entity.dy -= 5;
                } else if (engine.getButton('ArrowDown')) {
                    entity.dy += 5;
                } else if (engine.getButton('ArrowLeft')) {
                    entity.dx -= 5;
                } else if (engine.getButton('ArrowRight')) {
                    entity.dx += 5;
                }

                engine.drawSprite(entity);
            }
        }
    });


    const entities = await engine.loadPrototypes(options.entities);
    entities.forEach(engine.attachEntity);
    engine.querySelector('button').addEventListener('click', event => {
        entities.forEach(engine.detachEntity);
        entities.forEach(engine.attachEntity);
    });

    return time => {
        engine.updateSystems(time);
        return engine.isConnected;
    };
};