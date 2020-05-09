export const template = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
};

export const clone = (template) => template.content.cloneNode(true);

export const shadow = (element) => element.attachShadow({ mode: 'closed' });