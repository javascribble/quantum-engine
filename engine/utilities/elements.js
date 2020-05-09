export const define = (name, type) => customElements.define(`w-${name}`, type);

export const shadow = (element) => element.attachShadow({ mode: 'closed' });