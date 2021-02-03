import { Engine } from '../elements/engine.js';

Engine.plugins.add(api => {
    api.attachSystem({
        validate: entity => 'game' in entity,
        construct: entity => {
            entity.game.forEach(api.attachEntity)
        }
    });
});