import { initializeECS } from '../architecture/ecs.js';

export const architecture = {
    load: function (adapters, plugins, data) {
        const { animation } = plugins;
        const { updates } = animation;

        const { entities, systems } = initializeECS();

        updates.push(time => {
            for (const system of systems) {
                system.update?.(system.entities, time);
            }
        });

        this.entities = entities;
        this.systems = systems;
    },
    unload: function (adapters, plugins) {
    }
};