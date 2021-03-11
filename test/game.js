document.querySelector('quantum-engine').plugins.push({
    load: async engine => {
        const { canvas, input, entities, systems } = engine;

        systems.add({
            validate: entity => 'player' in entity && 'world' in entity,
            construct: entity => {
                const { world, player } = entity;
                const { tileset, divisor } = world;
                const { sprite, spawn } = player;
                const { sheet, size } = tileset;

                const sprites = [];
                for (let row = 0; row < sheet.height / size; row++) {
                    for (let column = 0; column < sheet.width / size; column++) {
                        sprites.push({ source: sheet, sx: column * size, sy: row * size, sw: size, sh: size });
                    }
                }

                const indices = [];
                for (let i = 0; i < divisor; i++) {
                    for (let ii = 0; ii < divisor; ii++) {
                        indices.push(Math.round(Math.random()));
                    }
                }

                const children = [];
                for (let index = 0; index < indices.length; index++) {
                    const tile = { ...sprites[indices[index]] };
                    tile.dx = tile.sw * (index % divisor);
                    tile.dy = tile.sh * Math.floor(index / divisor);
                    tile.dw = tile.sw;
                    tile.dh = tile.sh;
                    children.push(tile);
                }

                Object.assign(sprite, spawn);
                engine.querySelector('button').addEventListener('click', event => {
                    Object.assign(sprite, spawn);
                });

                children.push(sprite);
                entity.children = children;
            },
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

                    canvas.drawImageTree(entity, 'children');
                }
            }
        });

        entities.add(await engine.loadPrototype());
    },
    unload: engine => { }
});