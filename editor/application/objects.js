import { parentTemplate, childTemplate, orphanTemplate } from '../templates/objects.js';
import { clone } from '../utilities/elements.js';

export const addObjects = (objects, parent, indent = 0) => {
    for (const object of objects) {
        if (object.children && object.children.length > 0) {
            const template = clone(parentTemplate);
            const details = template.querySelector('details');
            details.querySelector('summary').innerText = object.name;
            details.style.paddingLeft = `${indent}px`;
            parent.appendChild(template);
            addObjects(object.children, details, indent + 10);
        } else {
            const template = clone(indent ? childTemplate : orphanTemplate);
            template.querySelector('div > span').innerText = object.name;
            parent.appendChild(template);
        }
    }
};