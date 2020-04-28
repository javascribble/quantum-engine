export const initializeCanvasRenderer = (engine) => {
    engine.systems.add({
        components: ['renderable'],
        add: (options) => {

        },
        remove: (entity) => {

        }
    });

    engine.executables.add({
        execute: (deltaTime) => {

        }
    });

    engine.plugins.add({
        start: (entity) => {

        },
        stop: () => {

        }
    });
};