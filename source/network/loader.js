import { getExtension } from '../utilities/strings.js';
import { trackPromises } from '../utilities/promises.js';

export const loadJson = (url, options) => fetch(url, options).then(response => response.json());

export const loadText = (url, options) => fetch(url, options).then(response => response.text());

export const loadBlob = (url, options) => fetch(url, options).then(response => response.blob());

export const loaders = {
    json: loadJson,
    txt: loadText,
    bin: loadBlob
};

export const load = (url, options) => loaders[getExtension(url)](url, options);

export const loadMany = (urls, update, options) => trackPromises(urls.map(url => load(url, options)), update);