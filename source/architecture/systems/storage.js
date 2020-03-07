import { systems } from '../../application/host'
import { registerComponentSystem } from '../ecs';

const entities = new Set();

// TODO: Update dirty properties in a system periodically.

export function registerStorageSystem() {
    registerComponentSystem('storage', entities);
    systems.push(updateStorageSystem);
}

function updateStorageSystem(deltaTime) {
}
