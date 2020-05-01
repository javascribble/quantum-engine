export default (engine) => {
    engine.modules.add({
        start: (options) => {
            // TODO: Add scene transitions (subscribe => detachEntity(scene)).
            // TODO: Implement custom and default placeholders.

            const scene = options.scenes[0];
            for (const prototype of scene.entities) {
                const entity = engine.proxyEntity();
                engine.attachEntity(entity);

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
            }
        },
        stop: () => { }
    });
};