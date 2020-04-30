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

export const loadMany = (resources, update, loader, options) => {
    const progress = { completed: 0, total: resources.length };
    update(progress);

    const loadOne = async (resource) => {
        const data = await load(resource, loader, options);
        progress.completed++;
        update(progress);
        return data;
    };

    return Promise.all(resources.map(loadOne));
};