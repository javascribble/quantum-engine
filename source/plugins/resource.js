const { load } = quantum;

export class ResourcePlugin {
    load(bridge, data) {
        const { html } = bridge;
        const { getResource } = html;
        const { resources, resourceRoot } = data;

        let pending = 0;
        const loadResources = indices => Promise.all(indices.map(loadResource));
        const loadResource = index => {
            const resource = resources[index];
            const element = getResource?.(resource);
            if (element) {
                return element;
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
}