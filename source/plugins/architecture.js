import { initializeECS } from '../architecture/ecs.js';
import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    connect: engine => {
        const { updates } = engine;

        const { entities, systems } = initializeECS();

        updates.push(time => {
            for (const system of systems) system.update(system.entities, time);
        });

        engine.entities = entities;
        engine.systems = systems;
    },
    disconnect: engine => {
        delete engine.entities;
        delete engine.systems;
    },
    run: engine => {
        engine.entities.clear();
        engine.systems.clear();
    }
});