import { Engine } from '../elements/engine.js';

Engine.plugins.add({
    load: engine => {
        const { video, systems } = engine;

        systems.add({
            validate: entity => entity.camera,
            construct: entity => {
                const camera = entity;
                console.log(camera)
            },
            update: (entities, time) => {
                for (const entity of entities) {
                    video.drawImageTree(entity, 'children');
                }
            }
        });
    },
    unload: engine => {
    }
});