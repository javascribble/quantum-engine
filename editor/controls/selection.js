import { rectanglesOverlap } from '../../shared/geometry/shapes.js';
import { distanceSquaredVector2Object } from '../../shared/geometry/vector2.js';
import { mouseUpEvent, mouseMoveEvent, mouseDownEvent } from '../constants/events.js';
import { show, hide, shown, select, deselect, selected, toggleSelection } from '../utilities/styles.js';
import { addListener, removeListener } from '../utilities/events.js';
import { query, queryAll } from '../utilities/elements.js';

const selections = new Set();

// TODO: Add shift selection.
// TODO: Get user feedback about ctrl selection, feels awkward.
// TODO: Dedupe events (click and highlight both fire if mouse is dragged and released within the click timeout window).
const handle = (event, elements) => {
    if (!event.ctrlKey) {
        for (const element of selections) {
            deselect(element);
        }

        selections.clear();
    }

    for (const element of elements) {
        if (selected(element)) {
            deselect(element);
            selections.delete(element);
        } else {
            select(element);
            selections.add(element);
        }
    }
};

// TODO: Refactor the way this is handled since reaching in from the objects panel is a hack.
export const handleClick = (event) => handle(event, [event.target]);

export const enableSelection = (root) => {
    const selection = query(root, '#selection');
    const origin = {};

    const draw = (event) => {
        const style = selection.style, x = event.clientX, y = event.clientY;
        style.top = `${y < origin.y ? y : origin.y}px`;
        style.left = `${x < origin.x ? x : origin.x}px`;
        style.width = `${Math.abs(x - origin.x)}px`;
        style.height = `${Math.abs(y - origin.y)}px`;
        if (!shown(selection) && distanceSquaredVector2Object(origin, { x, y }) > 10) {
            show(selection);
        }
    };

    const open = (event) => {
        addListener(root, mouseMoveEvent, draw);
        origin.x = event.clientX;
        origin.y = event.clientY;
    };

    const close = (event) => {
        removeListener(root, mouseMoveEvent, draw);
        if (shown(selection)) {
            hide(selection);
            const box = selection.getBoundingClientRect();
            handle(event, queryAll(root, '[selectable]').filter(element => rectanglesOverlap(box, element.getBoundingClientRect())));
        }
    };

    addListener(root, mouseDownEvent, open);
    addListener(root, mouseUpEvent, close);
};