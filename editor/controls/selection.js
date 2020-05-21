import { selectEvent, clickEvent, mouseUpEvent, mouseMoveEvent, mouseDownEvent } from '../constants/events.js';
import { dispatch, addListener, removeListener } from '../utilities/events.js';
import { shown, show, hide, toggleSelection } from '../utilities/styles.js';

export const enableSelection = (element) => {
    const selection = element.querySelector('#selection');
    const objects = element.querySelector('#hierarchy');
    addListener(objects, clickEvent, console.log);
    addListener(objects, selectEvent, console.log);

    const origin = {};
    const draw = (event) => {
        const x = event.clientX, y = event.clientY;
        const style = selection.style;
        if (!shown(style)) {
            origin.x = x;
            origin.y = y;
            show(style);
        }

        style.top = `${y < origin.y ? y : origin.y}px`;
        style.left = `${x < origin.x ? x : origin.x}px`;
        style.width = `${Math.abs(x - origin.x)}px`;
        style.height = `${Math.abs(y - origin.y)}px`;
    };

    const overlap = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

    const open = () => addListener(element, mouseMoveEvent, draw);
    const close = (event) => {
        const items = element.querySelectorAll('[selectable]');
        const box = selection.getBoundingClientRect();
        items.forEach((element) => {
            if (overlap(box, element.getBoundingClientRect())) {
                dispatch(element, new CustomEvent(selectEvent, { detail: event }));
            }
        });

        const style = selection.style;
        style.top = style.left = style.width = style.height = 0;
        hide(style);

        removeListener(element, mouseMoveEvent, draw);
    };

    addListener(element, mouseDownEvent, open);
    addListener(element, mouseUpEvent, close);
};