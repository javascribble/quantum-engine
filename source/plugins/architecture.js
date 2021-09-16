import { initializeECS } from '../architecture/ecs.js';

export class ArchitecturePlugin {
    bridge = initializeECS()

    load(bridge, data) {
        const { animation } = bridge;
        const { updates } = animation;

        const { systems } = this.bridge;

        updates.push(time => {
            for (const system of systems) {
                system.update?.(system.entities, time);
            }
        });
    }

    unload() {
    }
}