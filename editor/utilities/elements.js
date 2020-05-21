export const query = (element, selector) => element.querySelector(selector);

export const queryAll = (element, selector) => Array.from(element.querySelectorAll(selector));