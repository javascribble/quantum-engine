export function setElementParent(element, parent) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }

    if (parent) {
        parent.appendChild(element);
    }
}