import { initializeECS } from './ecs.js';

const { load, loadMany } = quantum;

export const initializeAPI = options => {
    const { resourcePath, resources, prototypes } = options;

    const paths = resources.map(resource => `${resourcePath}/${resource}`);
    const loadResources = indices => loadMany(indices.map(index => paths[index]));
    const loadResource = index => load(paths[index]);
    const loadPrototypes = indices => Promise.all(indices.map(loadPrototype));
    const loadPrototype = async index => {
        const [prototype, resources, references, inheritances] = prototypes[index];
        let clone = { ...prototype };

        for (const resource of resources) {
            const property = clone[resource];
            clone[resource] = Array.isArray(property) ? await loadResources(property) : await loadResource(property);
        }

        for (const reference of references) {
            const property = clone[reference];
            clone[reference] = Array.isArray(property) ? await loadPrototypes(property) : await loadPrototype(property);
        }

        for (const inheritance of inheritances) {
            clone = { ...await loadPrototype(inheritance), ...clone };
        }

        return clone;
    };

    return { ...initializeECS(), loadPrototype, loadPrototypes };
};