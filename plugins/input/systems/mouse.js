﻿import { addListener, preventDefault } from '../utilities/aliases';

const defaultMouseOptions = {
};

const mouseDown = (event) => {
    // TODO: Use pointer lock API.
    //let canvas = event.target;
    //let center = canvas.center;
    //let bounds = canvas.getBoundingClientRect();
    //let x = (event.clientX - bounds.left - center.x) / center.x;
    //let y = (center.y - (event.clientY - bounds.top)) / center.y;
};

const mouseMove = (event) => {
};

const mouseUp = (event) => {
};

const mouseWheel = (event) => {
};

export const createMouseSystem = (mouseOptions) => {
    const options = {
        ...defaultMouseOptions,
        ...mouseOptions
    }

    addListener('mousedown', mouseDown);
    addListener('mousemove', mouseMove);
    addListener('mouseup', mouseUp);
    addListener('mousewheel', mouseWheel);
    addListener('contextmenu', preventDefault);

    return {};
};
