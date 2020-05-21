import { clone } from '../../shared/utilities/elements.js';
import { parentObject, childObject } from '../templates/objects.js';
import { addStopPropagation } from '../utilities/events.js';
import { keys, entries } from '../aliases/object.js';
import { styleSheet } from '../utilities/styles.js';
import { clickEvent } from '../constants/events.js';

const indent = styleSheet.getPropertyValue('--primary-indention-units');

const addTitle = (element, text, indent) => {
    const name = element.querySelector('span');
    name.style.marginLeft = `${indent}px`;
    name.innerText = text;
    addStopPropagation(name, clickEvent);

    const controls = element.querySelector('div');
    addStopPropagation(controls, clickEvent);
};

const addObject = (object, element, level = 0) => {
    for (const [name, member] of entries(object)) {
        const parent = member.children && keys(member.children).length > 0;
        const template = clone(parent ? parentObject : childObject);
        if (parent) {
            const container = template.querySelector('details');
            const summary = container.querySelector('summary');
            summary.style.paddingLeft = `${level * indent}px`;
            addObject(member.children, container, level);
        }

        addTitle(template.querySelector('div'), name, ++level * indent);
        element.appendChild(template);
    }
};

export const addObjects = (root, element) => {
    addObject(root, element.querySelector('#hierarchy'));
};