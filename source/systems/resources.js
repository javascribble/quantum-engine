export const initializeResources = async (api, options) => {
    const { systems, loadOne, loadMany } = api;
    const { resourceBasePath, resourcePaths } = options;

    const urls = resourcePaths.map(resourcePath => `${resourceBasePath}/${resourcePath}`);

    systems.push({
        validate: entity => 'resource' in entity,
        add: async entity => {
            const property = entity.resource;
            entity[property] = await loadOne(urls[entity[property]])
        },
        remove: entity => { }
    });

    systems.push({
        validate: entity => 'resources' in entity,
        add: async entity => {
            const properties = entity.resources;
            const resources = await loadMany(properties.map(resource => urls[entity[resource]]));
            for (let i = 0; i < resources.length; i++) {
                entity[properties[i]] = resources[i];
            }
        },
        remove: entity => { }
    });
};