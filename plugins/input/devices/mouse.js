export const initializeMouse = (engine) => {
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

    const contextMenu = (event) => event.preventDefault();

    const listeners = engine.listeners;
    listeners.set('mousedown', mouseDown);
    listeners.set('mousemove', mouseMove);
    listeners.set('mouseup', mouseUp);
    listeners.set('mousewheel', mouseWheel);
    listeners.set('contextmenu', contextMenu);
};