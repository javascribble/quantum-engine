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

    const events = engine.events;
    events.set('touchstart', touchStart);
    events.set('touchmove', touchMove);
    events.set('touchend', touchEnd);
    events.set('touchcancel', touchCancel);
};