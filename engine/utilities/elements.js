export const createTemplate = (html) => {
    const template = document.createElement('template');
    if (html) {
        template.innerHTML = html;
    }

    return template;
};

export const move = (element, node) => {
    let parent = element.parentNode;
    if (parent) {
        parent.removeChild(element);
    }

    if (node) {
        node.appendChild(element);
    }
};