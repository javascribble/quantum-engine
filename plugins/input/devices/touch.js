export const initializeTouch = (engine) => {
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

    const listeners = engine.listeners;
    listeners.set('touchstart', touchStart);
    listeners.set('touchmove', touchMove);
    listeners.set('touchend', touchEnd);
    listeners.set('touchcancel', touchCancel);
};