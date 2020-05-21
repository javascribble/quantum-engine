import { rectanglesOverlap } from '../../shared/geometry/shapes.js';
import { clickEvent, mouseUpEvent, mouseMoveEvent, mouseDownEvent } from '../constants/events.js';
import { show, hide, toggleSelection, shown } from '../utilities/styles.js';
import { addListener, removeListener, dispatch } from '../utilities/events.js';

export const enableSelection = (element) => {
    const selection = element.querySelector('#selection');
    const origin = {};

    const draw = (event) => {
        const style = selection.style, x = event.clientX, y = event.clientY;
        style.top = `${y < origin.y ? y : origin.y}px`;
        style.left = `${x < origin.x ? x : origin.x}px`;
        style.width = `${Math.abs(x - origin.x)}px`;
        style.height = `${Math.abs(y - origin.y)}px`;
        show(selection);
    };

    const open = (event) => {
        addListener(element, mouseMoveEvent, draw);
        origin.x = event.clientX;
        origin.y = event.clientY;
    };

    const close = (event) => {
        hide(selection);
        removeListener(element, mouseMoveEvent, draw);
        const box = selection.getBoundingClientRect();
        const selectables = Array.from(element.querySelectorAll('[selectable]'));
        const selected = selectables.filter(selectable => rectanglesOverlap(box, selectable.getBoundingClientRect()));
        if (shown(selection)) {

        }
    };

    addListener(element, mouseDownEvent, open);
    addListener(element, mouseUpEvent, close);
};