import { getExtension, isString } from '../utilities/strings';

export const loadBlob = (url, options) => fetch(url, options).then(response => response.blob());

export const loadJson = (url, options) => fetch(url, options).then(response => response.json());

export const loadText = (url, options) => fetch(url, options).then(response => response.text());

export const loadFormData = (url, options) => fetch(url, options).then(response => response.formData());

export const loadArrayBuffer = (url, options) => fetch(url, options).then(response => response.arrayBuffer());

export const loaders = {
    json: loadJson,
    txt: loadText,
    bin: loadBlob
};

export const load = async (resource, loader, options) => {
    if (isString(resource)) {
        return await (loader || loaders[getExtension(resource)])(path, options);
    } else if (Array.isArray(resource)) {
        return resource.map(async (resource) => await load(resource, loader, options));
    } else {
        let object = {};
        for (const property in resource) {
            object[property] = await load(resource[property], loader, options);
        }

        return object;
    }
};


