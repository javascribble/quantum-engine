import { plugins } from '../architecture/api.js';

const { load } = quantum;

export class ResourcePlugin {
    load(bridge, data) {
        const { html } = bridge;
        const { elements } = html;
        const { resources, resourceRoot } = data;

        let pending = 0;
        const loadResources = indices => Promise.all(indices.map(loadResource));
        const loadResource = index => {
            const resource = resources[index];
            if (elements.has(resource)) {
                return elements.get(resource);
            } else {
                pending++;
                return load(`${resourceRoot}/${resource}`).then(data => {
                    pending--;
                    return data;
                });
            }
        };

        return { loadResources, loadResource };
    }

    unload() {
    }
}

plugins.set('resource', ResourcePlugin);