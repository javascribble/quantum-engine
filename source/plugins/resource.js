const { load } = quantum;

export class ResourcePlugin {
    bridge = {};

    load(bridge, data) {
        const { html } = bridge;
        const { getResource } = html;
        const { resources, resourceRoot } = data;

        let pending = 0;
        const loadResources = indices => Promise.all(indices.map(loadResource.bind(this)));
        const loadResource = index => {
            const resource = resources[index];
            const url = `${resourceRoot}/${resource}`;
            const element = getResource?.(resource, url);
            if (element) {
                return element;
            } else {
                pending++;
                return load(url).then(data => {
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