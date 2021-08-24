const { Engine } = Quantum;

Engine.prototype.loadPrototype = async function (index) {
    const { prototypes, prototypeRoot } = this.options;
    const [prototype, resources, references] = prototypes[index || prototypeRoot];
    const clone = { ...prototype };

    for (const resource in resources) {
        const property = resources[resource];
        clone[resource] = Object.assign(await (Array.isArray(property) ? this.loadResources(property) : this.loadResource(property)), clone[resource]);
    }

    for (const reference in references) {
        const property = references[reference];
        clone[reference] = Object.assign(await (Array.isArray(property) ? this.loadPrototypes(property) : this.loadPrototype(property)), clone[reference]);
    }

    return clone;
};

Engine.prototype.loadPrototypes = function (indices) {
    return Promise.all(indices.map(index => this.loadPrototype(index)));
};