import { updates, systems, listeners } from '../../../engine/main';

const defaultTouchOptions = {
};

export const enableTouchSystem = (touchOptions) => {
    const options = {
        ...defaultTouchOptions,
        ...touchOptions
    }

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

    listeners.set('touchstart', touchStart);
    listeners.set('touchmove', touchMove);
    listeners.set('touchend', touchEnd);
    listeners.set('touchcancel', touchCancel);
};
