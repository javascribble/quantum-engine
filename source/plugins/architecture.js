import { plugins } from '../architecture/api.js';
import { initializeECS } from '../architecture/ecs.js';

export class ArchitecturePlugin {
    #ecs = initializeECS();

    load(bridge, data) {
        const { animation } = bridge;
        const { updates } = animation;
        const { entities, systems, update } = this.#ecs;

        updates.add(update);

        return { entities, systems };
    }

    unload() {
        const { entities, systems } = this.#ecs;
        entities.clear();
        systems.clear();
    }
}

plugins.set('architecture', ArchitecturePlugin);