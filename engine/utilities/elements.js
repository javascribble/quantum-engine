export const define = (name, type) => customElements.define(`w-${name}`, type);

export const shadow = (element) => element.attachShadow({ mode: 'open' });

export const clone = (template) => template.content.cloneNode(true);

export const template = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
};