import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    connect: engine => {
    },
    disconnect: engine => {
        delete engine.root;
    },
    run: async engine => {
        const { entities, systems } = engine;

        const root = await engine.loadPrototype();
        entities.add(root);
        engine.root = root;

        const scene = await engine.loadPrototype(root.scenes[root.scene]);
    }
});