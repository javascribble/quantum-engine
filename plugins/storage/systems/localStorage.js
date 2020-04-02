const defaultLocalStorageOptions = {
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

export const createLocalStorageSystem = (localStorageOptions) => {
    const options = {
        ...defaultLocalStorageOptions,
        ...localStorageOptions
    };

    return {
        update: (deltaTime) => {

        }
    };
};
