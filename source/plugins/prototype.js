export class PrototypePlugin {
    async load(bridge, data) {
        const { resource } = bridge;
        const { loadResource, loadResources } = resource;
        const { prototypes, prototypeRoot } = data;

        const loadPrototypes = indices => Promise.all(indices.map(loadPrototype.bind(this)));
        const loadPrototype = async index => {
            const [prototype, resources, references] = prototypes[index || prototypeRoot];
            const clone = { ...prototype };

            for (const resource in resources) {
                const property = resources[resource];
                clone[resource] = Object.assign(await (Array.isArray(property) ? loadResources(property) : loadResource(property)), clone[resource]);
            }

            for (const reference in references) {
                const property = references[reference];
                clone[reference] = Object.assign(await (Array.isArray(property) ? loadPrototypes(property) : loadPrototype(property)), clone[reference]);
            }

            return clone;
        };

        return { root: await loadPrototype(), loadPrototypes, loadPrototype };
    }
}