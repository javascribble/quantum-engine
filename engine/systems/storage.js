import { systems } from '../application/architecture';
import { updates } from '../application/host';

export const registerStorageSystem = () => {
    const stores = new Set();
    const updateStorageSystem = (deltaTime) => {
        // TODO: Update dirty properties periodically.
    }

    //systems.add({});
    //updates.push(updateStorageSystem);
};
