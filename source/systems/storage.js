import { registerComponentSystemUpdate } from '../application/architecture';

export function registerStorageSystem() {
    const entities = new Set();
    
    function updateStorageSystem(deltaTime) {
        // TODO: Update dirty properties in a system periodically.
    }

    registerComponentSystemUpdate('storage', entities, updateStorageSystem);
}
