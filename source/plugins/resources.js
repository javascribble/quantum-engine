const { load } = quantum;

export const resources = {
    load: function (adapters, plugins, data) {
        const { resources, resourceRoot } = data;

        let pending = 0;
        this.loadResources = indices => Promise.all(indices.map(this.loadResource.bind(this)));
        this.loadResource = index => {
            pending++;
            return load(`${resourceRoot}/${resources[index]}`).then(resource => {
                pending--;
                return resource;
            });
        };
    },
    unload: function (adapters, plugins) {
    }
};