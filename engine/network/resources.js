import { loadBlob, loadText, loadJson, loadImage } from './loader';

export const resourceOptions = {
    path: '/resources',
    extensions: {
        json: loadJson,
        png: loadImage,
        txt: loadText,
        bin: loadBlob
    }   
};

export const loadResource = async (resource) => {
    const extension = resource.substring(resource.lastIndexOf('.') + 1);
    const loader = resourceOptions.extensions[extension];
    return await loader(`${resourceOptions.path}/${resource}`);
}

export const loadResources = async (resources, loader = loadResource) => {
    if(Array.isArray(resources)) {
        return resources.map(async resource => await loader(resource));
    } else {
        let resourceObject = {};
        for(const resource in resources) {
            resourceObject[resource] = await loader(resources[resource]);
        }

        return resourceObject;
    }
}
