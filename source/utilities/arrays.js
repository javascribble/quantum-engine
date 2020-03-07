export function lastArrayElement(array) {
    return array[array.length - 1];
}

export function removeArrayElement(array, element) {
    array.splice(array.indexOf(element), 1);
}