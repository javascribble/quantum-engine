import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    run: async engine => {
        const { entities, systems } = engine;

        const root = await engine.loadPrototype();
        entities.add(root);

        const scene = await engine.loadPrototype(root.scenes[root.scene]);
        entities.add(scene);
    }
});