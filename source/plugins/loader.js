export const enableLoaderPlugin = (api, options) => {
    const { loadOne, loadMany, attachEntity } = api;
    const { resourcePath, resources, prototypes } = options;

    const paths = resources.map(resource => `${resourcePath}/${resource}`);
    const loadResource = index => loadOne(paths[index]);
    const loadResources = indices => loadMany(indices.map(index => paths[index]));
    const loadData = async index => {
        const [prototype, resources, references, inheritances] = prototypes[index];
        let entity = { ...prototype };

        for (const resource of resources) {
            const property = entity[resource];
            entity[resource] = Array.isArray(property) ? await loadResources(property) : await loadResource(property);
        }

        for (const reference of references) {
            const property = entity[reference];
            entity[reference] = Array.isArray(property) ? await loadEntities(property) : await loadEntity(property);
        }

        for (const inheritance of inheritances) {
            const baseObject = await loadEntity(inheritance);
            entity = { ...baseObject, ...entity };
        }

        return entity;
    };

    const loadEntities = async indices => {
        const entities = await Promise.all(indices.map(loadData));
        entities.forEach(attachEntity);
        return entities;
    };

    const loadEntity = async index => {
        const entity = await loadData(index);
        attachEntity(entity);
        return entity;
    };

    Object.assign(api, {
        loadResource,
        loadResources,
        loadEntity,
        loadEntities
    });
};