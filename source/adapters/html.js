export class HtmlAdapter extends Set {
    bridge = {
        elements: new Map()
    };

    load(data) {

    }

    unload() {

    }

    add(element) {
        const { elements } = this.bridge;
        if (element.id) {
            elements.set(element.id, element);
        }

        super.add(element);
    }

    delete(element) {
        const { elements } = this.bridge;
        if (element.id) {
            elements.delete(element.id);
        }

        super.delete(element);
    }
}