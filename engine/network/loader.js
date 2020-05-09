import { getExtension } from '../decorators/string.js';

export const loadJson = (url, options) => fetch(url, options).then(response => response.json());

export const loadText = (url, options) => fetch(url, options).then(response => response.text());

export const loadBlob = (url, options) => fetch(url, options).then(response => response.blob());

export const loaders = {
    json: loadJson,
    txt: loadText,
    bin: loadBlob
};

export const load = (url, options) => loaders[getExtension(url)](url, options);