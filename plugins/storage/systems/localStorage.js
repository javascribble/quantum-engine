import { updates, systems } from '../../../engine/main';

const defaultLocalStorageOptions = {
};

export const enableLocalStorageSystem = (localStorageOptions) => {
    const options = {
        ...defaultLocalStorageOptions,
        ...localStorageOptions
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

    updates.add((deltaTime) => {

    });
};
