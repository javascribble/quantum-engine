export const enableMouse = (element) => {
    const mouseDown = (event) => {
    };

    const mouseMove = (event) => {
    };

    const mouseUp = (event) => {
    };

    const mouseWheel = (event) => {
    };

    const contextMenu = (event) => event.preventDefault();

    // TODO: Use pointer lock API.
    element.addEventListener('mousedown', mouseDown);
    element.addEventListener('mousemove', mouseMove);
    element.addEventListener('mouseup', mouseUp);
    element.addEventListener('mousewheel', mouseWheel);
    element.addEventListener('contextmenu', contextMenu);
};