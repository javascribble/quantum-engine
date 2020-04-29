export const isArray = Array.isArray;

export const lastArrayElement = (array) => array[array.length - 1];

export const insertArrayElement = (array, element, index) => array.splice(index, 0, element);

export const removeArrayElement = (array, element) => array.splice(array.indexOf(element), 1);