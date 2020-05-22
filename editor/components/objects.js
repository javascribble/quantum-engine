import { objectsTemplate } from '../templates/objects.js';
import { parentObject, childObject } from '../templates/objects.js';
import { addStopPropagation, addListener } from '../utilities/events.js';
import { styleSheet } from '../utilities/styles.js';
import { query } from '../utilities/elements.js';
import { keys, entries } from '../aliases/object.js';
import { clickEvent } from '../constants/events.js';
import { handleClick } from '../input/selection.js';
import { Component } from '../extensions/component.js';

const indent = styleSheet.getPropertyValue('--primary-indention-units');

export class Objects extends Component {
    constructor() {
        super(objectsTemplate);

        const addObjects = (objects, element, level = 0) => {
            const singleIndent = level * indent;
            const doubleIndent = ++level * indent;
            for (const [property, object] of entries(objects)) {
                const parent = object.children && keys(object.children).length > 0;
                const template = clone(parent ? parentObject : childObject);
                if (parent) {
                    const container = query(template, 'details');
                    const summary = query(container, 'summary');
                    summary.style.paddingLeft = `${singleIndent}px`;
                    addObjects(object.children, container, level);
                }

                const title = query(template, 'div');
                addListener(title, clickEvent, handleClick);

                const name = query(title, 'span');
                name.style.marginLeft = `${doubleIndent}px`;
                name.innerText = property;
                addStopPropagation(name, clickEvent);

                const controls = query(title, 'div');
                addStopPropagation(controls, clickEvent);

                element.appendChild(template);
            }
        };

        //addObjects(objects, query(root, '#hierarchy'));
    }
}