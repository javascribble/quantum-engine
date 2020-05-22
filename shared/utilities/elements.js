export const template = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
};

export const clone = (template) => template.content.cloneNode(true);

export const define = (name, type) => customElements.define(name, type);

export const shadow = (element, mode = 'closed') => element.attachShadow({ mode });