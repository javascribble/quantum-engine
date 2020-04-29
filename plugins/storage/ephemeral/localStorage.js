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

export const initializeLocalStorage = (engine) => {
    engine.systems.add({
        validate: (entity) => entity.state,
        add: (entity) => {

        },
        remove: (entity) => {

        }
    });

    engine.executables.add({
        execute: (deltaTime) => {

        }
    });

    engine.plugins.add({
        start: (options) => {

        },
        stop: () => {

        }
    });
};
