export const addListener = addEventListener;
export const removeListener = removeEventListener;

export const preventDefault = (event) => event.preventDefault();

export const setElementParent = (element, parent) => {
    let currentParent = element.parentNode;
    if (currentParent) {
        currentParent.removeChild(element);
    }

    if (parent) {
        parent.appendChild(element);
    }
};