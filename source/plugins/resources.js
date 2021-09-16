const { load } = quantum;

export class ResourcePlugin {
    bridge = {};

    load(bridge, data) {
        const { resources, resourceRoot } = data;

        let pending = 0;
        const loadResources = indices => Promise.all(indices.map(loadResource.bind(this)));
        const loadResource = index => {
            pending++;
            return load(`${resourceRoot}/${resources[index]}`).then(resource => {
                pending--;
                return resource;
            });
        };

        Object.assign(this.bridge, { loadResources, loadResource });
    }

    unload() {
    }
}