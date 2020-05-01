export default (engine) => {
    engine.modules.add({
        start: (options) => {
            // TODO: Add scene transitions (subscribe => detachEntity(scene)).
            const scene = options.scenes[0];
            for (const entity of scene.entities) {
                const proxy = engine.proxyEntity(entity);
                engine.attachEntity(proxy);
            }
        },
        stop: () => { }
    });
};