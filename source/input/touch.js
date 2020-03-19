import { addListener } from '../application/browser';
import { publish } from '../application/events';

export const defaultTouchControls = {
};

export const enableTouch = () => {
    addListener('touchstart', touchStart);
    addListener('touchmove', touchMove);
    addListener('touchend', touchEnd);
    addListener('touchcancel', touchCancel);
}

const touchStart = (event) => {
    //this.x = event.targetTouches[0].pageX - canvas.offsetLeft;
    //this.y = event.targetTouches[0].pageY - canvas.offsetTop;
}

const touchMove = (event) => {
}

const touchEnd = (event) => {
}

const touchCancel = (event) => {
}