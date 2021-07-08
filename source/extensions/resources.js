const { Engine } = Quantum;
const { load } = quantum;

Engine.prototype.loadResource = function (index) {
    const { resources, resourceRoot } = this.options;
    if (this.loading) {
        this.loading.total++;
    } else {
        this.loading = { complete: 0, total: 1 };
    }

    return load(`${resourceRoot}/${resources[index]}`).then(resource => {
        this.loading.complete++;
        if (this.loading.complete === this.loading.total) {
            delete this.loading;
        }

        return resource;
    });
};

Engine.prototype.loadResources = function (indices) {
    return Promise.all(indices.map(index => this.loadResource(index)));
};