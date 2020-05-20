import { parentObject, childObject } from '../templates/objects.js';
import { addListener, addStopPropagation } from '../utilities/events.js';
import { keys, entries } from '../aliases/object.js';
import { onClick } from '../constants/events.js';
import { clone } from '../utilities/elements.js';

const indent = getComputedStyle(document.documentElement).getPropertyValue('--primary-indention-units');

const addTitle = (text, element, indent) => {
    const title = element.querySelector('div');
    const select = () => title.classList.toggle('selected');
    addListener(title, onClick, select);

    const name = title.querySelector('span');
    name.style.marginLeft = `${indent}px`;
    name.innerText = text;
    addStopPropagation(name, onClick);

    const controls = title.querySelector('div');
    addStopPropagation(controls, onClick);
};

export const addObjects = (objects, element, level = 0) => {
    const singleIndent = level * indent;
    const doubleIndent = ++level * indent;
    for (const [name, object] of entries(objects)) {
        if (object.children && keys(object.children).length > 0) {
            const template = clone(parentObject);

            const container = template.querySelector('details');
            const summary = container.querySelector('summary');
            summary.style.paddingLeft = `${singleIndent}px`;

            addTitle(name, template, doubleIndent);
            element.appendChild(template);

            addObjects(object.children, container, level);
        } else {
            const template = clone(childObject);

            addTitle(name, template, doubleIndent);
            element.appendChild(template);
        }
    }
};