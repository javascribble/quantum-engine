import { getExtension } from '../utilities/strings';

export const loadBlob = (url, options) => fetch(url, options).then(response => response.blob());

export const loadJson = (url, options) => fetch(url, options).then(response => response.json());

export const loadText = (url, options) => fetch(url, options).then(response => response.text());

export const loaders = {
    json: loadJson,
    txt: loadText,
    bin: loadBlob
};

export const load = (resource, loader = loaders[getExtension(resource)], options) => loader(resource, options);

export const loadMany = (resources, progress, loader, options) => {
    const loadOne = async (resource) => {
        const data = await load(resource, loader, options);
        progress();
        return data;
    };

    return Promise.all(resources.map(loadOne));
};