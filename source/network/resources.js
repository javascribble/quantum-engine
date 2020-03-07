import { loadBlob, loadText, loadJson, loadImage } from './loader';

export const resourceOptions = {
    path: '/resources',
    extensions: {
        json: loadJson,
        png: loadImage,
        mtl: loadText,
        obj: loadText,
        glsl: loadText,
        bin: loadBlob
    }
};

export function loadResource(file) {
    let extension = file.substring(file.lastIndexOf('.') + 1);
    return resourceOptions.extensions[extension](`${resourceOptions.path}/${file}`);
}

export async function loadResources(resources, resourceLoader) {
    for (const resource in resources) {
        resources[resource] = await resourceLoader(resources[resource]);
    }
}
