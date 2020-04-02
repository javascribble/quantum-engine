import { plugins } from '../../../engine/main';

export const defaultStorageOptions = {
};

const saveLocal = (state) => {
    for (const name in state) {
        state[name] = localStorage.getKey(name);
    }
};

const loadLocal = (state) => {
    for (const name in state) {
        localStorage.setKey(name, state[name]);
    }
};

plugins.storage = (storageOptions) => {
    const options = {
        ...defaultStorageOptions,
        storageOptions
    };
};
