import { load } from '../../../engine/main';
import { parseGltf } from '../parsers/gltf';

export const loadScene = async (resource) => {
    // TODO: Add other formats.
    return await parseGltf(await load(resource));
};
