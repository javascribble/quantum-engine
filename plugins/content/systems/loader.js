﻿import { plugins, isString, getExtension } from '../../../engine/main';

export const defaultLoaderOptions = {
    path: '/resources'
};

export const loadBlob = (url) => fetch(url).then(response => response.blob());

export const loadJson = (url) => fetch(url).then(response => response.json());

export const loadText = (url) => fetch(url).then(response => response.text());

export const loadFormData = (url) => fetch(url).then(response => response.formData());

export const loadArrayBuffer = (url) => fetch(url).then(response => response.arrayBuffer());

export const loaders = {
    json: loadJson,
    txt: loadText,
    bin: loadBlob
};

export const load = async (resource, loader) => {
    if (isString(resource)) {
        const path = resource.startsWith('/') ? resource : `${loaderOptions.path}/${resource}`;
        return await (loader || loaders[getExtension(resource)])(path);
    } else if (Array.isArray(resource)) {
        return resource.map(async (resource) => await load(resource, loader));
    } else {
        let object = {};
        for (const property in resource) {
            object[property] = await load(resource[property]);
        }

        return object;
    }
};

plugins.loader = (loaderOptions) => {
    const options = {
        ...defaultLoaderOptions,
        ...loaderOptions
    }
};
