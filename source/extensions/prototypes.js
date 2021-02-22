import { Engine } from '../elements/engine.js';

Engine.prototype.loadPrototype = async function (index) {
    const { prototypes, prototypeRoot } = this.options;

    const [prototype, resourceProperties, prototypeProperties] = prototypes[index || prototypeRoot];
    const clone = { ...prototype };

    for (const resourceProperty of resourceProperties) {
        const property = clone[resourceProperty];
        clone[resourceProperty] = Array.isArray(property) ? await this.loadResources(property) : await this.loadResource(property);
    }

    for (const prototypeProperty of prototypeProperties) {
        const property = clone[prototypeProperty];
        clone[prototypeProperty] = Array.isArray(property) ? await this.loadPrototypes(property) : await this.loadPrototype(property);
    }

    return clone;
}

Engine.prototype.loadPrototypes = function (indices) {
    return Promise.all(indices.map(this.loadPrototype.bind(this)));
}