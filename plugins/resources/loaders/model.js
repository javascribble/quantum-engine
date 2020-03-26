import { loadText, resourceOptions } from '../imports';
import { parseObj } from '../parsers/obj';

const loadModel = async (resource) => {
    // TODO: Add other formats.
    return await parseObj(await loadText(resource));
};

resourceOptions.extensions.obj = loadModel;
resourceOptions.extensions.mtl = loadText;
