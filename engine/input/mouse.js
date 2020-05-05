import { eventListeners } from '../utilities/browser.js';

const mouseDown = (event) => {
};

const mouseMove = (event) => {
};

const mouseUp = (event) => {
};

const mouseWheel = (event) => {
};

const contextMenu = (event) => event.preventDefault();

// TODO: Use pointer lock API.

eventListeners.set('mousedown', mouseDown);
eventListeners.set('mousemove', mouseMove);
eventListeners.set('mouseup', mouseUp);
eventListeners.set('mousewheel', mouseWheel);
eventListeners.set('contextmenu', contextMenu);