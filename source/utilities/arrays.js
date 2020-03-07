export function lastArrayElement(array) {
    return array[array.length - 1];
}

export function insertArrayElement(array, element, index) {
    array.splice(index, 0, element);
}

export function removeArrayElement(array, element) {
    array.splice(array.indexOf(element), 1);
}