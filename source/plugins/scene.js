import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    load: async engine => {
        const { entities } = engine;

        const root = await engine.loadPrototype();

        let current = await engine.loadPrototype(root.scenes[root.scene]);
        entities.add(current);

        engine.loadScene = async index => {
            let scene = await engine.loadPrototype(root.scenes[index]);
            entities.delete(current);
            entities.add(scene);
            current = scene;

        };
    },
    unload: engine => {
        delete engine.loadScene;
    }
});