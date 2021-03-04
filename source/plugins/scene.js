import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    connect: engine => {
        const { systems } = engine;

        systems.push(time => {
            for (const system of systems) system.update(system.entities, time);
        });

        Object.assign(engine, { entities, systems });
    },
    disconnect: engine => { }
});