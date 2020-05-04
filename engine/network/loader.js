import { getExtension } from '../utilities/strings.js';

export const loadJson = (url, options) => fetch(url, options).then(response => response.json());

export const loadText = (url, options) => fetch(url, options).then(response => response.text());

export const loadBlob = (url, options) => fetch(url, options).then(response => response.blob());

export const loadImage = async (resource) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = resource;
    });
};

export const loaders = {
    json: loadJson,
    txt: loadText,
    bin: loadBlob,
    png: loadImage
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

//const urls = resources.locators.map(locator => locator.startsWith('/') ? locator : `${resources.path}/${locator}`);

//export const loadResource = (index, loader, options) => load(urls[index], loader, options);

//export const loadResources = (indices, update, loader, options) => loadMany(indices.map(index => urls[index]), update, loader, options);