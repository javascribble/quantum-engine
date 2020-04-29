export default (engine) => {
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

    engine.modules.add({
        start: (options) => {

        },
        stop: () => {

        }
    });
};
