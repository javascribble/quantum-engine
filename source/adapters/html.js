import { getResource } from '../decorators/element.js';
import { adapters } from '../architecture/api.js';

export class HtmlAdapter extends Set {
    #resources = new Map();

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

adapters.set('html', HtmlAdapter);