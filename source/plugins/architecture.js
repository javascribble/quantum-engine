import { initializeECS } from '../architecture/ecs.js';

export class ArchitecturePlugin {
    bridge = {};

    load(bridge, data) {
        const { animation } = bridge;
        const { updates } = animation;

        const { entities, systems, update } = initializeECS();

        updates.add(update);

        this.unload = () => updates.delete(update);

        Object.assign(this.bridge, { entities, systems });
    }
}