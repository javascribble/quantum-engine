import { createEntityInterface } from '../architecture/entity.js';
import { createInputSystem } from '../systems/input.js';
import { createSpriteSystem } from '../systems/sprite.js';
import { createSceneSystem } from '../systems/scene.js';
import { Engine } from '../elements/engine.js';

Engine.prototype.load = function (options) {
    Object.assign(this, createEntityInterface());
    createInputSystem(this, options);
    createSpriteSystem(this, options);
    createSceneSystem(this, options);
};

Engine.prototype.update = function (delta, elapsed) {
    this.systems?.forEach(system => system.update?.(delta, elapsed));
};