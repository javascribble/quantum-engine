export const enableLoaderPlugin = (api, options) => {
    const { loadOne, loadMany, attachEntity } = api;
    const { resourcePath, resources, prototypes } = options;

    const paths = resources.map(resource => `${resourcePath}/${resource}`);

    const loadResource = index => loadOne(paths[index]);
    const loadResources = indices => loadMany(indices.map(index => paths[index]));
    const loadEntities = indices => Promise.all(indices.map(loadEntity));
    const loadEntity = async index => {
        const [prototype, resources, references, inheritances] = prototypes[index];
        let object = { ...prototype };

        for (const resource of resources) {
            const property = object[resource];
            object[resource] = Array.isArray(property) ? await loadResources(property) : await loadResource(property);
        }

        for (const reference of references) {
            const property = object[reference];
            object[reference] = Array.isArray(property) ? await loadEntities(property) : await loadEntity(property);
        }

        for (const inheritance of inheritances) {
            const baseObject = await loadEntity(inheritance);
            object = { ...baseObject, ...object };
        }

        attachEntity(object);
        return object;
    };

    Object.assign(api, {
        loadResource,
        loadResources,
        loadEntity,
        loadEntities
    });
};