import { shadow, clone } from '../../shared/utilities/elements.js';
import { objectsTemplate } from '../templates/objects.js';
import { parentObject, childObject } from '../templates/objects.js';
import { addStopPropagation, addListener } from '../utilities/events.js';
import { select, deselect, selected, styleSheet } from '../utilities/styles.js';
import { query } from '../utilities/elements.js';
import { clickEvent } from '../constants/events.js';
import { keys, entries } from '../aliases/object.js';
import { Component } from '../extensions/component.js';

const indent = styleSheet.getPropertyValue('--primary-indention-units');

export class Objects extends Component {
    constructor() {
        super();

        const root = shadow(this);
        root.appendChild(clone(objectsTemplate));

        addListener(root, 'mousedown', console.log);



        const selections = new Set();

        // TODO: Dedupe events (click and highlight both fire if mouse is dragged and released within the click timeout window).
        const handle = (event, elements) => {
            if (event.ctrlKey) {
                for (const element of elements) {
                    if (selected(element)) {
                        deselect(element);
                        selections.delete(element);
                    } else {
                        select(element);
                        selections.add(element);
                    }
                }
            } else if (event.shiftKey) {
                // TODO: Add shift selection.
            } else {
                for (const element of selections) {
                    deselect(element);
                }

                selections.clear();
                for (const element of elements) {
                    select(element);
                    selections.add(element);
                }
            }
        };

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
                addListener(title, clickEvent, (event) => handle(event, [event.target]));

                const name = query(title, 'span');
                name.style.marginLeft = `${doubleIndent}px`;
                name.innerText = property;
                addStopPropagation(name, clickEvent);

                const controls = query(title, 'div');
                addStopPropagation(controls, clickEvent);

                element.appendChild(template);
            }
        };

        const project = {
            "test name": {
                properties: {},
                children: {
                    "test name2": {
                        properties: {},
                        children: {}
                    }
                }
            },
            "test name2": {
            },
            "test name3": {
            }
        };

        addObjects(project, query(root, '#hierarchy'));
    }
}