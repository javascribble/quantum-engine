import { addListener } from '../aliases/browser.js';

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

addListener('mousedown', mouseDown);
addListener('mousemove', mouseMove);
addListener('mouseup', mouseUp);
addListener('mousewheel', mouseWheel);
addListener('contextmenu', contextMenu);