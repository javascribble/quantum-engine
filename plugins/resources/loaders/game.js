import { loadResource } from '../../../engine/main';
import { parseGltf } from '../parsers/gltf';

export const loadGame = async (resource) => {
    // TODO: Add other formats.
    return await parseGltf(await loadResource(resource));
};
