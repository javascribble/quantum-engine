import { createEntityInterface } from '../architecture/entity.js';
import { createSceneSystem } from '../systems/scene.js';
import { Engine } from '../elements/engine.js';

Engine.prototype.load = function (options) {
    Object.assign(this, createEntityInterface());
    createSceneSystem(this, options);
};

Engine.prototype.update = function (delta, elapsed) {
    this.systems?.forEach(system => system.update?.(delta, elapsed));
};