import { parseObj } from '../parsers/obj';

export const loadModel = async (resource) => {
    // TODO: Add other formats.
    return await parseObj(await load(resource));
};