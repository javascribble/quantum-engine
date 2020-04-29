export const initializeScenes = (engine) => {
    engine.systems.add({
        validate: (entity) => entity.entities,
        add: (entity) => {
            entity.entities.forEach(engine.createEntity);
        },
        delete: (entity) => {

        }
    });

    engine.executables.add((deltaTime) => {

    });

    engine.modules.add({
        start: (options) => {
            // TODO: Add scene transitions.
            const scene = engine.createEntity();
            scene.entities = options.scenes[0].entities;
        },
        stop: () => { }
    });
};