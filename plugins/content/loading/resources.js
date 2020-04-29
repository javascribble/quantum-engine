export const initializeResources = async (engine) => {
    const resources = [];

    engine.systems.add({
        validate: (entity) => entity.resources,
        add: (entity) => {
            const load = entity.resources.map(resource => resources[resource]);
            if (load.length > 0) {
                entity.loading = { current: 0, total: load.length };
                const progress = () => entity.loading.current++;
                const complete = (values) => {
                    entity.resources = values;
                    delete entity.loading;
                };

                engine.loadMany(load, progress).then(complete);
            }
        },
        remove: (entity) => {
            // TODO: Cancel pending requests.
        }
    });

    engine.plugins.add({
        start: (options) => resources = options.resources.map(path => path.startsWith('/') ? path : `${options.path}/${path}`),
        stop: () => resources = []
    });
};