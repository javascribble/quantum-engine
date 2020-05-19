import { parentTemplate, childTemplate } from '../templates/objects.js';
import { addListener, addStopPropagation } from '../utilities/events.js';
import { onClick } from '../constants/events.js';
import { clone } from '../utilities/elements.js';

const indent = getComputedStyle(document.documentElement).getPropertyValue('--primary-indention-units');

export const addObjects = (objects, parent, level = 0) => {
    const singleIndent = level * indent;
    const doubleIndent = ++level * indent;
    for (const object of objects) {
        if (object.children && object.children.length > 0) {
            const template = clone(parentTemplate);

            const container = template.querySelector('details');

            const summary = container.querySelector('summary');
            summary.style.paddingLeft = `${singleIndent}px`;

            const title = template.querySelector('div');

            const select = () => {
                title.classList.toggle('selected');
            };

            addListener(title, onClick, select);

            const name = title.querySelector('span');
            name.style.marginLeft = `${doubleIndent}px`;
            name.innerText = object.name;
            addStopPropagation(name, onClick);

            parent.appendChild(template);

            addObjects(object.children, container, level);
        } else {
            const template = clone(childTemplate);


            const title = template.querySelector('div');
            const select = (event) => {
                console.log(event);
                title.classList.toggle('selected');
            };

            addListener(title, onClick, select);

            const name = title.querySelector('span');
            addStopPropagation(name, onClick);

            name.style.marginLeft = `${doubleIndent}px`;
            name.innerText = object.name;

            parent.appendChild(template);
        }
    }
};