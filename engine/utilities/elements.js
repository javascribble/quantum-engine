const createElement = document.createElement.bind(document);

export const createSlot = (name) => {
    const slot = createElement('slot');
    if (name) {
        slot.name = name;
    }

    return slot;
};

export const createTemplate = (html) => {
    const template = createElement('template');
    if (html) {
        template.innerHTML = html;
    }

    return template;
};

export const define = (name, type) => customElements.define(`w-${name}`, type);