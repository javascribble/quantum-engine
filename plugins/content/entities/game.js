import { load } from '../../../engine/main';

export const loadGame = async (resource) => {
    const game = await load(resource);
    return game;
};
