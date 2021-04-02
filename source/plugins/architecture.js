import { initializeECS } from '../architecture/ecs.js';
import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    load: engine => {
        const { updates } = engine;

        const { entities, systems } = initializeECS();

        updates.push(time => {
            for (const system of systems) system.update?.(system.entities, time);
        });

        engine.entities = entities;
        engine.systems = systems;
    },
    unload: engine => {
        delete engine.entities;
        delete engine.systems;
    }
});