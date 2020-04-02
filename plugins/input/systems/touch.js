import { addListener } from '../utilities/aliases';

const defaultTouchOptions = {
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

export const createTouchSystem = (touchOptions) => {
    const options = {
        ...defaultTouchOptions,
        ...touchOptions
    }

    addListener('touchstart', touchStart);
    addListener('touchmove', touchMove);
    addListener('touchend', touchEnd);
    addListener('touchcancel', touchCancel);

    return {};
};
