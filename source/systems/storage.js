import { registerSystem } from '../application/architecture';

export const registerStorageSystem = () => {
    const stores = new Set();    
    const updateStorageSystem = (deltaTime) => {
        // TODO: Update dirty properties periodically.
    }

    //registerSystem(storageComponent, stores, updateStorageSystem);
}
