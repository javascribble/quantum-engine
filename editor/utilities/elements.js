export const template = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
};

export const clone = (template) => template.content.cloneNode(true);