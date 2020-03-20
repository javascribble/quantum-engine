const storage = localStorage;

export const saveLocal = (state) => {
    for (const name in state) {
        state[name] = storage.getKey(name);
    }
}

export const loadLocal = (state) => {
    for (const name in state) {
        storage.setKey(name, state[name]);
    }
}
