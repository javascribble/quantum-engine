import { Engine } from '../elements/engine.js';

Engine.plugins.add((api, engine) => {
    api.attachSystem({
        validate: entity => 'scene' in entity,
        construct: entity => {
            entity.scene.forEach(api.attachEntity);
        },
        destruct: entity => {
            entity.scene.forEach(api.detachEntity);
        }
    });

    engine.querySelector('button').addEventListener('click', event => {
        console.log(event);
    });
});