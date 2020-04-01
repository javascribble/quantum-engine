import { load } from '../imports';
import { parseGltf } from '../parsers/gltf';

export const loadScene = async (resource) => {
    // TODO: Add other formats.
    return await parseGltf(await load(resource));
};
