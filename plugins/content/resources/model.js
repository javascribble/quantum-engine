import { loadObj } from '../parsers/obj';

export async function loadModel(resource) {
    return await loadObj(resource);
}
