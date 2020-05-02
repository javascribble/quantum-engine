export const saveState = (state) => {
    for (const name in state) {
        state[name] = localStorage.getKey(name);
    }
};

export const loadState = (state) => {
    for (const name in state) {
        localStorage.setKey(name, state[name]);
    }
};