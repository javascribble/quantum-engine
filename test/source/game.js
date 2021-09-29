import '/node_modules/@javascribble/quantum-canvas/bundles/main.js';
import '/node_modules/@javascribble/quantum-input/bundles/main.js';

const { plugins } = document.querySelector('quantum-engine');

plugins.set('player', {
    load: async (bridge, data) => {
        const { input, video, architecture } = bridge;
        const { systems } = architecture;

        systems.add({
            validate: entity => entity.player && entity.world,
            update: (entities, time) => {
                for (const entity of entities) {
                    const { translation } = entity.player.transform;
                    if (input.getState('UP')) {
                        translation.y -= 5;
                    } else if (input.getState('DOWN')) {
                        translation.y += 5;
                    } else if (input.getState('LEFT')) {
                        translation.x -= 5;
                    } else if (input.getState('RIGHT')) {
                        translation.x += 5;
                    }

                    video.render(entity);
                }
            }
        });
    }
});

plugins.set('world', {
    load: async (bridge, data) => {
        const { architecture, prototype } = bridge;
        const { entities } = architecture;
        const { root } = prototype;
        const { player, world } = root;
        const { image, size } = world;

        const tiles = [];
        for (let row = 0; row < image.height / size; row++) {
            for (let column = 0; column < image.width / size; column++) {
                tiles.push({
                    image,
                    sx: column * size,
                    sy: row * size,
                    sw: size,
                    sh: size,
                    dx: 0,
                    dy: 0,
                    dw: size,
                    dh: size
                });
            }
        }

        const divisor = 15;
        world.children = [];
        for (let i = 0; i < divisor; i++) {
            for (let ii = 0; ii < divisor; ii++) {
                const index = i * divisor + ii;
                const sprite = tiles[Math.round(Math.random())];
                world.children.push({
                    sprite: {
                        ...sprite,
                        dx: sprite.sw * (index % divisor),
                        dy: sprite.sh * Math.floor(index / divisor)
                    }
                });
            }
        }

        root.children = [world, player];
        entities.add(root);
    }
});