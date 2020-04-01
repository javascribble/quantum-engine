import { plugins, assign } from '../../../engine/main';

export const storageOptions = {
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

plugins.storage = (options) => {
    assign(storageOptions, options);
};
