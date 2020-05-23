import { rectanglesOverlap } from '../../shared/geometry/shapes.js';
import { distanceSquaredVector2Object } from '../../shared/geometry/vector2.js';
import { mouseUpEvent, mouseMoveEvent, mouseDownEvent } from '../constants/events.js';
import { addListener, removeListener, dispatch } from '../utilities/events.js';
import { show, hide, shown } from '../utilities/styles.js';
import { queryAll } from '../utilities/elements.js';

export const enableSelection = (root, selection, selector = '[selectable]') => {
    const origin = {};

    const draw = (event) => {
        const style = selection.style, x = event.clientX, y = event.clientY;
        style.top = `${y < origin.y ? y : origin.y}px`;
        style.left = `${x < origin.x ? x : origin.x}px`;
        style.width = `${Math.abs(x - origin.x)}px`;
        style.height = `${Math.abs(y - origin.y)}px`;
        if (!shown(selection) && distanceSquaredVector2Object(origin, { x, y }) > 30) {
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
            const customEvent = new CustomEvent('select', { detail: event });
            const box = selection.getBoundingClientRect();
            queryAll(root, selector).forEach(element => {
                if (rectanglesOverlap(box, element.getBoundingClientRect())) {
                    dispatch(element, customEvent);
                }
            });
        }
    };

    addListener(root, mouseDownEvent, open);
    addListener(root, mouseUpEvent, close);
};