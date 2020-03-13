import { registerSystem } from '../application/architecture';
import { storageComponent } from '../components/storage';

export function registerLocalStorageSystem() {
    const stores = new Set();    
    function updateStorageSystem(deltaTime) {
        // TODO: Update dirty properties in a system periodically.
    }

    registerSystem(storageComponent, stores, updateStorageSystem);
}
