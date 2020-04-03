import { systems, load, assign, publish } from '../../../engine/main';
import { resourcesComponent } from '../components/resources';

const defaultResourcesOptions = {
    path: '/' + resourcesComponent
};

export const enableResourcesSystem = (resourcesOptions) => {
    const options = {
        ...defaultResourcesOptions,
        ...resourcesOptions
    };

    const resources = options.resources;

    systems.add({
        components: [resourcesComponent],
        add: (entity) => {
            const resources = entity.resources;
            for (let i = 0; i < resources.length; i++) {
                const resource = resources[i]
                if (isInteger(resource)) {
                    resources[i] = options.resources[resource];
                }
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
                        load(url.startsWith('/') ? url : `${options.path}/${url}`)
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