import { EventBroker } from '../import.js';
import { createEntityManager } from '../architecture/entity.js';
import { createInputSystem } from '../systems/input.js';
import { createSpriteSystem } from '../systems/sprite.js';
import { createSceneSystem } from '../systems/scene.js';
import { Engine } from '../elements/engine.js';

Engine.prototype.load = async function (options) {
    const { systems, createEntity, deleteEntity } = createEntityManager();
    const api = { ...this.plugins, createEntity, deleteEntity };
    const state = { broker: new EventBroker() };

    systems.add(await createInputSystem(api, state, options));
    systems.add(await createSpriteSystem(api, state, options));
    systems.add(await createSceneSystem(api, state, options));

    this.systems = systems;
};

Engine.prototype.update = function (delta, elapsed) {
    this.systems?.forEach(system => system.update?.(delta, elapsed));
};