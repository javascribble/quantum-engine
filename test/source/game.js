const game = {
    load: async (adapters, plugins, data) => {
        const { html, input, video } = adapters;
        const { animation, architecture, prototypes, resources } = plugins;
        const { controls, devices, state } = input;
        const { entities, systems } = architecture;
        const { loadPrototype } = prototypes;

        const actions = {
            UP: 'UP',
            DOWN: 'DOWN',
            LEFT: 'LEFT',
            RIGHT: 'RIGHT'
        };

        const { UP, DOWN, LEFT, RIGHT } = devices.keyboard;
        controls[UP] = actions.UP;
        controls[DOWN] = actions.DOWN;
        controls[LEFT] = actions.LEFT;
        controls[RIGHT] = actions.RIGHT;

        systems.add({
            validate: entity => entity.player && entity.world,
            update: (entities, time) => {
                for (const entity of entities) {
                    const { translation } = entity.player.transform;
                    if (state[actions.UP]) {
                        translation.y -= 5;
                    } else if (state[actions.DOWN]) {
                        translation.y += 5;
                    } else if (state[actions.LEFT]) {
                        translation.x -= 5;
                    } else if (state[actions.RIGHT]) {
                        translation.x += 5;
                    }

                    video.render(entity);
                }
            }
        });

        //(new URL(document.location)).searchParams.get('scene')
        const root = await loadPrototype();
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
    },
    unload: (adapters, plugins) => { }
};

document.querySelector('quantum-engine').plugins.game = game;