export default async (api, options) => {
    quantum.enableLoaderPlugin(api, options);
    quantum.enableTilesPlugin(api, options);

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

    await api.loadEntities(options.entities);
    return time => {
        api.updateSystems(time);
        return true;
    };
};