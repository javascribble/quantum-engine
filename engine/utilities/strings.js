export const isString = (string) => typeof string === "string";

export const splitNewLines = (string) => string.split('\n');

export const removeNewLines = (string) => string.replace(/\n/g, '');

export const firstSubstring = (string, index) => string.substring(0, index);

export const getExtension = (string) => string.substring(string.lastIndexOf('.') + 1);