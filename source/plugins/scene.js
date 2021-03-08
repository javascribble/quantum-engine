import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    load: async engine => {
        const { entities } = engine;

        const root = await engine.loadPrototype();

        const scene = await engine.loadPrototype(root.scenes[root.scene]);
        entities.add(scene);

        // engine.loadScene = async index => {
        //     root.loading = true;
        //     root.progress = 0;
        // };
    },
    unload: engine => {
        delete engine.loadScene;
    }
});