export default async (engine, api, options) => {
    const { resourcePath, resources, prototypes } = options;

    const paths = resources.map(resource => `${resourcePath}/${resource}`);
    const loadResources = indices => api.loadMany(indices.map(index => paths[index]));
    const loadResource = index => api.loadOne(paths[index]);
    const loadPrototypes = indices => Promise.all(indices.map(loadPrototype));
    const loadPrototype = async index => {
        const [prototype, resources, references, inheritances] = prototypes[index];
        let clone = { ...prototype };

        for (const resource of resources) {
            const property = clone[resource];
            clone[resource] = Array.isArray(property) ? await loadResources(property) : await loadResource(property);
        }

        for (const reference of references) {
            const property = clone[reference];
            clone[reference] = Array.isArray(property) ? await loadPrototypes(property) : await loadPrototype(property);
        }

        for (const inheritance of inheritances) {
            clone = { ...await loadPrototype(inheritance), ...clone };
        }

        return clone;
    };

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
            }

            entity.tiles = tiles;
        },
        update: (entities, time) => {
            for (const entity of entities) {
                for (const tile of entity.tiles) {
                    api.drawSprite(tile);
                }
            }
        }
    });

    api.attachSystem({
        validate: entity => 'player' in entity,
        construct: entity => Object.assign(entity, entity.player),
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

                api.drawSprite(entity);
            }
        }
    });

    const entities = await loadPrototypes(options.entities);
    entities.forEach(api.attachEntity);
    engine.querySelector('button').addEventListener('click', event => {
        entities.forEach(api.detachEntity);
        entities.forEach(api.attachEntity);
    });

    return time => {
        api.updateSystems(time);
        return engine.isConnected;
    };
};