export const last = (array) => array[array.length - 1];

export const insert = (array, element, index) => array.splice(index, 0, element);

export const remove = (array, element) => array.splice(array.indexOf(element), 1);