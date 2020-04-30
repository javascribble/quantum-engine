export default (engine) => {
    let urls = [];

    engine.systems.set('resources', {
        add: (resources) => {
            const load = resources.indices.map(index => urls[index]);
            if (load.length > 0) {
                engine.loadMany(load, resources.update).then(resources.complete).catch(resources.error);
            }
        },
        delete: (resources) => {
            // TODO: Cancel pending requests.
        }
    });

    engine.modules.add({
        start: (options) => urls = options.resources.map(path => path.startsWith('/') ? path : `${options.path}/${path}`),
        stop: () => { }
    });
};