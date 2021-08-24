import '/node_modules/@javascribble/quantum/bundles/main-window.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-extensions.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-plugins.js';
import '/node_modules/@javascribble/quantum-input/bundles/main.js';
import '/bundles/main.js';
import '/bundles/main-extensions.js';
import '/bundles/main-plugins.js';

document.querySelector('quantum-engine').plugins.push({
    load: async engine => {
        const { audio, video, input, entities, systems } = engine;

        const controls = {
            UP: 'UP',
            DOWN: 'DOWN',
            LEFT: 'LEFT',
            RIGHT: 'RIGHT'
        };

        const { UP, DOWN, LEFT, RIGHT } = input.devices.keyboard;
        input.controls[UP] = controls.UP;
        input.controls[DOWN] = controls.DOWN;
        input.controls[LEFT] = controls.LEFT;
        input.controls[RIGHT] = controls.RIGHT;

        systems.add({
            validate: entity => entity.player && entity.world,
            update: (entities, time) => {
                for (const entity of entities) {
                    const { translation } = entity.player.transform;
                    if (input[controls.UP]) {
                        translation.y -= 5;
                    } else if (input[controls.DOWN]) {
                        translation.y += 5;
                    } else if (input[controls.LEFT]) {
                        translation.x -= 5;
                    } else if (input[controls.RIGHT]) {
                        translation.x += 5;
                    }

                    video.draw(entity);
                }
            }
        });

        //(new URL(document.location)).searchParams.get('scene')
        const root = await engine.loadPrototype();
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
    unload: engine => { }
});

document.body.style.visibility = 'visible';