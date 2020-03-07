import { publish } from '../application/events';

export const defaultMouseControls = {
};

export function enableMouse() {
    addEventListener('mousedown', mouseDown);
    addEventListener('mousemove', mouseMove);
    addEventListener('mouseup', mouseUp);
    addEventListener('mousewheel', mouseWheel);
    addEventListener('contextmenu', contextMenu);
}

function mouseDown(event) {
    // TODO: Use pointer lock API.
    //let canvas = event.target;
    //let center = canvas.center;
    //let bounds = canvas.getBoundingClientRect();
    //let x = (event.clientX - bounds.left - center.x) / center.x;
    //let y = (center.y - (event.clientY - bounds.top)) / center.y;
}

function mouseMove(event) {
}

function mouseUp(event) {
}

function mouseWheel(event) {

}

function contextMenu(event) {
    event.preventDefault();
}