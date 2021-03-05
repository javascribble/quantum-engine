import { Engine } from '../elements/engine.js';

Engine.prototype.loadPrototype = async function (index) {
    const { prototypes, prototypeRoot } = this.options;

    const data = prototypes[index || prototypeRoot];
    const prototype = { ...data[0] };
    const resources = { ...data[1] };
    const references = { ...data[2] };

    for (const resource of resources) {
        const property = resources[resource];
        resources[resource] = Array.isArray(property) ? await this.loadResources(property) : await this.loadResource(property);
    }

    for (const reference of references) {
        const property = references[reference];
        references[reference] = Array.isArray(property) ? await this.loadPrototypes(property) : await this.loadPrototype(property);
    }

    return [prototype, resources, references];
};

Engine.prototype.loadPrototypes = function (indices) {
    return Promise.all(indices.map(this.loadPrototype.bind(this)));
};