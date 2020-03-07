export function saveLocalState(state) {
    for (const name in state) {
        state[name] = localStorage.getKey(name);
    }
}

export function loadLocalState(state) {
    for (const name in state) {
        localStorage.setKey(name, state[name]);
    }
}
