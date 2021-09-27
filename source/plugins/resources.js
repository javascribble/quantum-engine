const { load } = quantum;

export class ResourcePlugin {
    bridge = {};

    load(bridge, data) {
        const { html } = bridge;
        const { elements } = html;
        const { resources, resourceRoot } = data;

        let pending = 0;
        const loadResources = indices => Promise.all(indices.map(loadResource.bind(this)));
        const loadResource = index => {
            const resource = resources[index];
            if (elements.has(resource)) {
                return Promise.resolve(elements.get(resource));
            } else {
                pending++;
                return load(`${resourceRoot}/${resource}`).then(data => {
                    pending--;
                    return data;
                });
            }
        };

        Object.assign(this.bridge, { loadResources, loadResource });
    }

    unload() {
    }
}