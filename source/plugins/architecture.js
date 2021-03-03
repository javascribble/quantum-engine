import { initializeECS } from '../architecture/ecs.js';
import { Engine } from '../elements/engine.js';

Engine.plugins.add(engine => {
    const { updates } = engine;

    const { entities, systems } = initializeECS();

    updates.push(time => {
        for (const system of systems) system.update(system.entities, time);
    });

    Object.assign(engine, { entities, systems });
});