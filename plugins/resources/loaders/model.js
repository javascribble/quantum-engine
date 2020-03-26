import { loadText, loadResource, resourceOptions } from '../imports';
import { parseObj } from '../parsers/obj';

export const loadModel = async (resource) => {
    // TODO: Add other formats.
    return await parseObj(await loadResource(resource));
};

resourceOptions.extensions.obj = loadText;
resourceOptions.extensions.mtl = loadText;
