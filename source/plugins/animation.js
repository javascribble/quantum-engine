import { Engine } from '../elements/engine.js';

const { animate } = quantum;

Engine.plugins.add(engine => {
    const updates = [];
    const update = time => {
        for (const update of updates) update(time);
    };

    Object.assign(engine, { updates, animation: animate(update) });
});