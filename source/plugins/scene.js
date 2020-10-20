import { Engine } from '../elements/engine.js';

const load = async api => {
    const { options, loadScene, applyScene, broker, loadSprite, drawSprite } = api;
    for (const defaultScene of options.defaultScenes) {
        applyScene(await loadScene(defaultScene));
    }

    const sprite = await loadSprite(0);
    broker.subscribe('MoveUp', _ => sprite.dy -= 10);
    broker.subscribe('MoveDown', _ => sprite.dy += 10);
    broker.subscribe('MoveLeft', _ => sprite.dx -= 10);
    broker.subscribe('MoveRight', _ => sprite.dx += 10);
    quantum.animate((deltaTime, elapsed) => {
        drawSprite(sprite);
        return true;
    });
};

const next = Engine.prototype.integrate;
Engine.prototype.integrate = function (api) {
    const { options, loadMap, drawMap } = api;

    const loadScene = async index => {
        const scene = { ...options.scenes[index] };
        for (let i = 0; i < options.scenes[index].maps.length; i++) {
            scene.maps[i] = await loadMap(i);
        }

        return scene;
    };

    const applyScene = scene => {
        quantum.animate(() => {
            drawMap(scene.maps[0]);
            return true;
        });
    }

    const clearScene = index => {
    };

    if (!this.onload.has(load)) {
        this.onload.add(load);
    }

    api.loadScene = loadScene;
    api.applyScene = applyScene;
    api.clearScene = clearScene;
    next?.call(this, api);
};