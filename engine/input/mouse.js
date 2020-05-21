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
    const addListener = element.addEventListener;
    addListener('mousedown', mouseDown);
    addListener('mousemove', mouseMove);
    addListener('mouseup', mouseUp);
    addListener('mousewheel', mouseWheel);
    addListener('contextmenu', contextMenu);
};