import { animationPlugin } from '../source/plugins/animation.js';
import { architecturePlugin } from '../source/plugins/architecture.js';
import { scenePlugin } from '../source/plugins/scene.js';

const engine = document.querySelector('quantum-engine');
engine.plugins.push(animationPlugin);
engine.plugins.push(architecturePlugin);
engine.plugins.push(scenePlugin);
engine.plugins.push(async engine => {
    const { canvas, systems, input } = engine;
    canvas.setResolution();

    systems.push({
        entities: [],
        validate: entity => 'player' in entity,
        update: (entities, time) => {
            for (const { player } of entities) {
                const sprite = player.sprite;
                if (input.getButton('ArrowUp')) {
                    sprite.dy -= 5;
                } else if (input.getButton('ArrowDown')) {
                    sprite.dy += 5;
                } else if (input.getButton('ArrowLeft')) {
                    sprite.dx -= 5;
                } else if (input.getButton('ArrowRight')) {
                    sprite.dx += 5;
                }
            }
        }
    });

    systems.push({
        entities: [],
        validate: entity => 'scene' in entity,
        update: (entities, time) => {
            for (const { scene, scenes } of entities) {
                canvas.drawImageTree(scenes[scene], 'children');
            }
        }
    });

    const loadScene = scene => {
        const { tileset, divisor } = scene.world;
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

        Object.assign(scene.player.sprite, scene.player.spawn);
        children.push(scene.player.sprite);
        scene.children = children;
    };

    const root = await engine.loadPrototype();
    engine.attachEntity(root);

    const scene = root.scenes[0];
    engine.attachEntity(scene);
    loadScene(scene);

    engine.querySelector('button').addEventListener('click', event => {
        Object.assign(scene.player.sprite, scene.player.spawn)
    });

    engine.animation.start();
});