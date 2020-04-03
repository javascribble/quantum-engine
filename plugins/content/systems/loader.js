import { load, assign } from '../../../engine/main';

const defaultLoaderOptions = {
    path: '/resources'
};

export const enableLoaderSystem = (loaderOptions) => {
    const options = {
        ...defaultLoaderOptions,
        ...loaderOptions
    };

    const resources = new Map();
    systems.add({
        components: ['resources'],
        add: (entity) => {
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