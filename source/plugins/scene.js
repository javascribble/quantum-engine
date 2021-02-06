import { Engine } from '../elements/engine.js';

Engine.plugins.add((api, engine) => {
    api.attachSystem({
        validate: entity => 'scenes' in entity,
        add: entity => {
            api.attachEntity(entity.scenes[entity.default]);

            // TODO: Add entity cloning, enforce single prototype.
            // const clone = api.cloneEntity(entity.scenes[entity.default]);
            // api.attachEntity(clone);
            // entity.active.add(clone); 
        },
        remove: entity => {
        }
    });

    engine.querySelector('button').addEventListener('click', event => {
        console.log(event);
    });
});