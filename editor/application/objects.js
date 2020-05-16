import { clone } from '../utilities/elements.js';

export const addObjects = (object, parent) => {
    if (object.children.length > 0) {
        const summary = document.createElement('summary');
        summary.innerText = object.name;

        const details = document.createElement('details');
        details.appendChild(summary);

        parent.appendChild(details);
    } else {
        const div = document.createElement('div');
        div.innerText = object.name;

        parent.appendChild(div);
    }
};