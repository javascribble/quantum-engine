import { plugins, updates, systems } from '../../engine/main';
import { createLocalStorageSystem } from './systems/localStorage';

const defaultStorageOptions = {
};

plugins.storage = (storageOptions) => {
    const options = {
        ...defaultStorageOptions,
        storageOptions
    };

    const localStorageSystem = createLocalStorageSystem(options);

    updates.push(localStorageSystem.update);
};