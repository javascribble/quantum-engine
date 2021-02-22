const { load } = quantum;

export const initializePrototypes = async options => {
    const { resources, resourceRoot, prototypes, prototypeRoot } = options;

    const resourcePaths = resources.map(resource => `${resourceRoot}/${resource}`);

    const loadResources = indices => Promise.all(indices.map(loadResource));
    const loadPrototypes = indices => Promise.all(indices.map(loadPrototype));
    const loadResource = index => load(resourcePaths[index]);
    const loadPrototype = async index => {
        const [prototype, resourceProperties, prototypeProperties] = prototypes[index];
        const clone = { ...prototype };

        for (const resourceProperty of resourceProperties) {
            const property = clone[resourceProperty];
            clone[resourceProperty] = Array.isArray(property) ? await loadResources(property) : await loadResource(property);
        }

        for (const prototypeProperty of prototypeProperties) {
            const property = clone[prototypeProperty];
            clone[prototypeProperty] = Array.isArray(property) ? await loadPrototypes(property) : await loadPrototype(property);
        }

        return clone;
    };

    return { root: await loadPrototype(prototypeRoot), loadPrototype, loadPrototypes };
};