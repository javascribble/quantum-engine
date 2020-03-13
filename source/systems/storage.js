import { registerSystem } from '../application/architecture';

export function registerLocalStorageSystem() {
    const stores = new Set();    
    function updateStorageSystem(deltaTime) {
        // TODO: Update dirty properties periodically.
    }

    //registerSystem(storageComponent, stores, updateStorageSystem);
}
