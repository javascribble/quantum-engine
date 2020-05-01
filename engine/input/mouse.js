import { listeners } from '../application/browser';

// TODO: Use pointer lock API.

const mouseDown = (event) => {
};

const mouseMove = (event) => {
};

const mouseUp = (event) => {
};

const mouseWheel = (event) => {
};

const contextMenu = (event) => event.preventDefault();

listeners.set('mousedown', mouseDown);
listeners.set('mousemove', mouseMove);
listeners.set('mouseup', mouseUp);
listeners.set('mousewheel', mouseWheel);
listeners.set('contextmenu', contextMenu);