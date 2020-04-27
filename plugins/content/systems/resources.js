import { load, assign, isInteger, createEntity } from '../../../engine/main';
import { resourcesComponent } from '../components/resources';

export const enableResourcesSystem = async (options, systems, updates) => {
    const entity = createEntity();
    entity.delete();

    const resources = new Map();
    for (const resource of options.resources) {
        resource.set(resource, await load(resource));
    }

    systems.add({
        components: [resourcesComponent],
        add: (entity) => {
            const resources = entity.resources.filter(isInteger);
            for (let i = 0; i < resources.length; i++) {
                resources[i] = options.resources[resources[i]];
            }

            const progress = { total: 0, completed: 0 };
            const loadResources = (urls, container) => {
                const handleError = (error) => {
                    console.log(error); // TODO: Retry.
                };

                const completeResource = (resource) => {
                    progress.completed++;
                    assign(container, resource);
                    if (resource.resources) {
                        loadResources(resource.resources, resource);
                    }
                };

                const loadResource = (url) => {
                    if (resources.has(url)) {
                        const resource = resources.get(url);
                        resource.references++;
                        assign(container, resource);
                    } else {
                        progress.total++;
                        load(url.startsWith('/') ? url : `${options.path || ('/' + resourcesComponent)}/${url}`)
                            .then(completeResource)
                            .catch(handleError);
                    }
                };

                urls.forEach(loadResource);
            };

            loadResources(entity.resources, entity);
        },
        delete: (entity) => {
            for (const resource of entity.resources) {
                if (resources.has(resource) && resources.get(resource).references-- === 0) {
                    resources.delete(resource);
                }
            }
        }
    });
};