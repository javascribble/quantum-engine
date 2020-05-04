export const defineElement = (name, type) => customElements.define(`ws-${name}`, type);

export const createTemplate = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
};

export const setElementParent = (element, parent) => {
    let currentParent = element.parentNode;
    if (currentParent) {
        currentParent.removeChild(element);
    }

    if (parent) {
        parent.appendChild(element);
    }
};