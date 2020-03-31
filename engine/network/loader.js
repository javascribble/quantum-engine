import { isString, getExtension } from '../utilities/strings';

export const loaderOptions = {
    path: '/resources',
    extensions: {
        json: loadJson,
        txt: loadText,
        bin: loadBlob
    }
};

const curryLoader = (loader) => async (resource) => await load(resource, loader);

const resolveLoader = (resource) => loaderOptions.extensions[getExtension(resource)];

export const loadBlob = (url) => fetch(url).then(response => response.blob());

export const loadJson = (url) => fetch(url).then(response => response.json());

export const loadText = (url) => fetch(url).then(response => response.text());

export const loadFormData = (url) => fetch(url).then(response => response.formData());

export const loadArrayBuffer = (url) => fetch(url).then(response => response.arrayBuffer());

export const load = async (resource, loader = resolveLoader(resource)) => {
    if (isString(resource)) {
        return await loader(`${loaderOptions.path}/${resource}`);
    } else if (Array.isArray(resource)) {
        return resource.map(curryLoader(loader));
    } else {
        let object = {};
        for (const property in resource) {
            object[property] = await load(resource[property]);
        }

        return object;
    }
};
