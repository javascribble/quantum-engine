export const initializeCanvasRenderer = (engine) => {
    engine.systems.add({
        validate: (entity) => entity.renderable,
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