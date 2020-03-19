import { loadText, resourceOptions } from '../imports';
import { parseObj } from '../parsers/obj';

resourceOptions.extensions.obj = loadText;
resourceOptions.extensions.mtl = loadText;

export async function loadModel(resource) {
    // TODO: Add other formats.
    return await parseObj(await loadResource(resource));
}
