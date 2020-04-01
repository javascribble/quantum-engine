import { assign } from '../utilities/objects';

export const storageOptions = {
};

export const configureStorage = (options) => {
    assign(storageOptions, options);
};

export const saveLocal = (state) => {
    for (const name in state) {
        state[name] = localStorage.getKey(name);
    }
};

export const loadLocal = (state) => {
    for (const name in state) {
        localStorage.setKey(name, state[name]);
    }
};
