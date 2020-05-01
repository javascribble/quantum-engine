import { getExtension } from '../utilities/strings';

export const loadBlob = (url, options) => fetch(url, options).then(response => response.blob());

export const loadJson = (url, options) => fetch(url, options).then(response => response.json());

export const loadText = (url, options) => fetch(url, options).then(response => response.text());

export const loaders = {
    json: loadJson,
    txt: loadText,
    bin: loadBlob
};

export const load = (url, loader = loaders[getExtension(url)], options) => loader(url, options);

export const loadMany = (urls, update, loader, options) => {
    const progress = { completed: 0, total: urls.length };
    update(progress);

    const loadOne = async (url) => {
        const data = await load(url, loader, options);
        progress.completed++;
        update(progress);
        return data;
    };

    return Promise.all(urls.map(loadOne));
};