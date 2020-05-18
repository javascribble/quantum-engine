import { parentTemplate, childTemplate } from '../templates/objects.js';
import { clone } from '../utilities/elements.js';

export const addObjects = (objects, parent, indent = 0) => {
    for (const object of objects) {
        if (object.children && object.children.length > 0) {
            const template = clone(parentTemplate);

            const details = template.querySelector('details');
            details.style.paddingLeft = `${indent}px`;

            const input = details.querySelector('summary > input');
            input.style.width = `calc(100% - 17px)`;
            input.value = object.name;

            parent.appendChild(template);

            addObjects(object.children, details, 12);
        } else {
            const template = clone(childTemplate);

            const div = template.querySelector('div');
            div.style.paddingLeft = `${indent + 17}px`;

            const input = div.querySelector('input');
            input.style.width = '100%';
            input.value = object.name;

            parent.appendChild(template);
        }
    }
};