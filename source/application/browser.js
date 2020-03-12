export function setElementParent(element, parent) {
    element.parentNode && element.parentNode.removeChild(element);
    parent && parent.appendChild(element);
}