import { plugins, publish, assign, addListener } from '../imports';

export const touchOptions = {
};

const touchStart = (event) => {
    //this.x = event.targetTouches[0].pageX - canvas.offsetLeft;
    //this.y = event.targetTouches[0].pageY - canvas.offsetTop;
};

const touchMove = (event) => {
};

const touchEnd = (event) => {
};

const touchCancel = (event) => {
};

plugins.touch = (options) => {
    assign(touchOptions, options);

    addListener('touchstart', touchStart);
    addListener('touchmove', touchMove);
    addListener('touchend', touchEnd);
    addListener('touchcancel', touchCancel);
};
