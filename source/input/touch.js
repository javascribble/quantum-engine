import { publish } from '../application/events';

addEventListener('touchstart', touchStart);
addEventListener('touchmove', touchMove);
addEventListener('touchend', touchEnd);
addEventListener('touchcancel', touchCancel);

export const defaultTouchControls = {
};

function touchStart(event) {
    //this.x = event.targetTouches[0].pageX - canvas.offsetLeft;
    //this.y = event.targetTouches[0].pageY - canvas.offsetTop;
}

function touchMove(event) {
}

function touchEnd(event) {
}

function touchCancel(event) {

}