export const enableMouse = (element) => {
    const touchStart = (event) => {
    };

    const touchMove = (event) => {
    };

    const touchEnd = (event) => {
    };

    const touchCancel = (event) => {
    };

    const addListener = element.addEventListener;
    addListener('touchstart', touchStart);
    addListener('touchmove', touchMove);
    addListener('touchend', touchEnd);
    addListener('touchcancel', touchCancel);
};