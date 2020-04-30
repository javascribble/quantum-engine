export const initializeScenes = (engine) => {
    engine.modules.add({
        start: (options) => {
            // TODO: Add scene transitions.
            // TODO: Implement custom and default placeholders.

            const entity = engine.proxyEntity();
            engine.attachEntity(entity);

            const prototype = options.scenes[0].entities[0];

            const resources = prototype.resources;
            resources.indices = resources;
            resources.update = console.log;
            resources.error = console.log;
            resources.complete = values => {
                entity.renderable = {
                    ...prototype.renderable,
                    image: values[0]
                };
            };

            entity.resources = resources;
        },
        stop: () => { }
    });
};