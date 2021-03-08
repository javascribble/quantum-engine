import { initializeEntities } from '../architecture/entity.js';
import { initializeSystems } from '../architecture/system.js';
import { Engine } from '../elements/engine.js';

const { ObservableSet } = quantum;

Engine.plugins.add({
    load: engine => {
        const { updates } = engine;

        const systems = new ObservableSet();
        const entities = new ObservableSet();
        initializeEntities(entities, systems);
        initializeSystems(systems, entities);

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