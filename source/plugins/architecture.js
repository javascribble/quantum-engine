import { initializeECS } from '../architecture/ecs.js';

export const architecturePlugin = engine => {
    const { updates } = engine;

    const { entities, systems, updateEntity } = initializeECS();

    updates.push(time => {
        for (const system of systems) system.update(system.entities, time);
    });

    Object.assign(engine, { entities, systems, updateEntity });
};