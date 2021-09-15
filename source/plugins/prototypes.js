export const prototypes = {
    load: function (adapters, plugins, data) {
        const { resources } = plugins;
        const { loadResource, loadResources } = resources;

        const { prototypes, prototypeRoot } = data;

        this.loadPrototypes = indices => Promise.all(indices.map(this.loadPrototype.bind(this)));
        this.loadPrototype = async index => {
            const [prototype, resources, references] = prototypes[index || prototypeRoot];
            const clone = { ...prototype };

            for (const resource in resources) {
                const property = resources[resource];
                clone[resource] = Object.assign(await (Array.isArray(property) ? loadResources(property) : loadResource(property)), clone[resource]);
            }

            for (const reference in references) {
                const property = references[reference];
                clone[reference] = Object.assign(await (Array.isArray(property) ? this.loadPrototypes(property) : this.loadPrototype(property)), clone[reference]);
            }

            return clone;
        };
    },
    unload: function (adapters, plugins) {
    }
};