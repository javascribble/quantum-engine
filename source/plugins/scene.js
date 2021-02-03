import { Engine } from '../elements/engine.js';

Engine.plugins.add((api, engine) => {
    api.attachSystem({
        validate: entity => 'scenes' in entity,
        construct: entity => {
            api.attachEntity(entity.scenes[entity.default]);
            // const clone = api.cloneEntity(entity.scenes[entity.default]);
            // api.attachEntity(clone);
            // entity.active.add(clone); 
        },
        destruct: entity => {
            entity.scene.forEach(api.detachEntity);
        }
    });

    engine.querySelector('button').addEventListener('click', event => {
        console.log(event);
    });
});