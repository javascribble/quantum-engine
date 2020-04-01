import { load } from '../imports';

export const loadGame = async (resource) => {
    const game = await load(resource);
    return game;
};
