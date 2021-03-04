import { Engine } from '../elements/engine.js';

const { animate } = quantum;

Engine.plugins.add({
    connect: engine => {
        const updates = [];
        const update = time => {
            for (const update of updates) update(time);
        };

        Object.assign(engine, { updates, animation: animate(update) });
    },
    disconnect: engine => {
        engine.animation?.stop()
    },
    run: engine => {
        engine.animation.start()
    }
});