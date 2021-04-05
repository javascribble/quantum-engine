document.querySelector('quantum-engine').plugins.push({
    load: async engine => {
        const { audio, video, input, entities, systems } = engine;

        systems.add({
            validate: entity => entity.player && entity.world,
            update: (entities, time) => {
                for (const entity of entities) {
                    const { player, world } = entity;
                    const { character } = player;
                    const { position } = character;

                    if (input.getButton('ArrowUp')) {
                        position.y -= 5;
                    } else if (input.getButton('ArrowDown')) {
                        position.y += 5;
                    } else if (input.getButton('ArrowLeft')) {
                        position.x -= 5;
                    } else if (input.getButton('ArrowRight')) {
                        position.x += 5;
                    }

                    video.drawImageTree(world);
                }
            }
        });

        const root = await engine.loadPrototype();

        const { world, player } = root;
        const { tilemap, divisor } = world;
        const { character, spawn } = player;

        const sprites = engine.importUniformSprites(tilemap.image, tilemap.size);

        world.children = [];
        for (let i = 0; i < divisor; i++) {
            for (let ii = 0; ii < divisor; ii++) {
                const index = i * divisor + ii;
                const sprite = sprites[Math.round(Math.random())];
                world.children.push({
                    ...sprite,
                    position: {
                        x: sprite.sw * (index % divisor),
                        y: sprite.sh * Math.floor(index / divisor)
                    }
                });
            }
        }

        Object.assign(character, spawn);
        world.children.push(character);

        entities.add(root);
    },
    unload: engine => { }
});