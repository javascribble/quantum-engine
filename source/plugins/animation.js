import { Engine } from '../elements/engine.js';

const { animate } = quantum;

Engine.plugins.add({
    connect: engine => {
        const updates = [];
        const update = time => {
            for (const update of updates) update(time);
        };

        engine.updates = updates;
        engine.animation = animate(update);
    },
    disconnect: engine => {
        engine.animation.stop();

        delete engine.updates;
        delete engine.animation;
    },
    run: engine => {
        engine.animation.start();
    }
});