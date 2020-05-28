import { Component, query, addListener } from '@javascribble/quantum';
import { select, deselect, selected } from '../utilities/styles.js';
import { clickEvent } from '../constants/events.js';
import { objects } from '../templates/objects.js';

export class Objects extends Component {
    constructor() {
        super(objects);

        const root = this.shadowRoot;
        const tree = query(root, 'tree-component');
        console.log(tree.setState);

        // TODO: Dedupe events (click and highlight both fire if mouse is dragged and released within the click timeout window).
        const selections = new Set();
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

        //addListener(root, 'mousedown', console.log);
        //addListener(title, clickEvent, (event) => handle(event, [event.target]));
        //addObjects(project, query(root, '#hierarchy'));
    }
}