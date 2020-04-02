import { plugins, publish, addListener } from '../../../engine/main';

export const defaultTouchOptions = {
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

plugins.touch = (touchOptions) => {
    const options = {
        ...defaultTouchOptions,
        ...touchOptions
    }

    addListener('touchstart', touchStart);
    addListener('touchmove', touchMove);
    addListener('touchend', touchEnd);
    addListener('touchcancel', touchCancel);
};
