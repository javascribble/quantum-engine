import { Engine } from '../elements/engine.js';

const { load } = quantum;

Engine.prototype.loadResource = function (index) {
    const { resources, resourceRoot } = this.options;
    return load(`${resourceRoot}/${resources[index]}`);
};

Engine.prototype.loadResources = function (indices) {
    return Promise.all(indices.map(this.loadResource.bind(this)));
};