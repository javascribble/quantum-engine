document.querySelector('quantum-engine').plugins.push({
    load: async engine => {
        const { audio, video, input, entities, systems } = engine;

        systems.add({
            validate: entity => entity.player && entity.children,
            update: (entities, time) => {
                for (const entity of entities) {
                    const { player } = entity;
                    const { sprite } = player;

                    if (input.getButton('ArrowUp')) {
                        sprite.dy -= 5;
                    } else if (input.getButton('ArrowDown')) {
                        sprite.dy += 5;
                    } else if (input.getButton('ArrowLeft')) {
                        sprite.dx -= 5;
                    } else if (input.getButton('ArrowRight')) {
                        sprite.dx += 5;
                    }

                    video.drawImageTree(entity, 'children');
                }
            }
        });

        const root = await engine.loadPrototype();

        const { world, player, camera } = root;
        const { tileset, divisor } = world;
        const { sprite, spawn } = player;
        const { sheet, size } = tileset;

        const sprites = engine.importUniformSheet(sheet, size);

        root.children = [];
        for (let i = 0; i < divisor; i++) {
            for (let ii = 0; ii < divisor; ii++) {
                const index = i * divisor + ii;
                const tile = { ...sprites[Math.round(Math.random())] };
                tile.dx = tile.sw * (index % divisor);
                tile.dy = tile.sh * Math.floor(index / divisor);
                tile.dw = tile.sw;
                tile.dh = tile.sh;
                root.children.push(tile);
            }
        }

        root.children.push(sprite);

        Object.assign(sprite, spawn);
        engine.querySelector('button').addEventListener('click', event => Object.assign(sprite, spawn));

        entities.add(root);
    },
    unload: engine => { }
});