import { registerSystem } from '../application/architecture';
import { storageComponent } from '../components/storage';

export function registerStorageSystem() {
    const stores = new Set();    
    function updateStorageSystem(deltaTime) {
        // TODO: Update dirty properties in a system periodically.
    }

    registerSystem(storageComponent, stores, updateStorageSystem);
}
