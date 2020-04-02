export const isString = (string) => typeof string === "string";

export const isValidLine = (line) => line && /\S/.test(line) && !line.startsWith('#');

export const getExtension = (string) => string.substring(string.lastIndexOf('.') + 1);