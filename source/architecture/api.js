import { initializeECS } from './ecs.js';

export const initializeAPI = (engine, options) => {
    const { resourcePath, resources, prototypes } = options;

    const paths = resources.map(resource => `${resourcePath}/${resource}`);
    const loadResource = index => engine.loadOne(paths[index]);
    const loadResources = indices => engine.loadMany(indices.map(index => paths[index]));

    const ecs = initializeECS();
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
            entity = { ...await loadEntity(inheritance), ...entity };
        }

        return entity;
    };

    const loadEntity = async index => {
        const entity = await loadData(index);
        ecs.attachEntity(entity);
        return entity;
    };

    const loadEntities = async indices => {
        const entities = await Promise.all(indices.map(loadData));
        entities.forEach(ecs.attachEntity);
        return entities;
    };

    return {
        ...ecs,
        loadEntity,
        loadEntities
    };
};