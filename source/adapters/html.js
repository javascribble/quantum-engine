const getResource = element => element.getAttribute('resource');

export class HtmlAdapter extends Set {
    #resources = new Map();

    constructor(engine) {
        super();
    }

    async load(bridge, data) {
        const getResource = resource => this.#resources.get(resource);

        return { getResource };
    }

    add(element) {
        const resource = getResource(element);
        if (resource) {
            this.#resources.set(resource, element);
        } else {
            super.add(element);
        }
    }

    delete(element) {
        const resource = getResource(element);
        if (resource) {
            this.#resources.delete(resource);
        } else {
            super.delete(element);
        }
    }
}