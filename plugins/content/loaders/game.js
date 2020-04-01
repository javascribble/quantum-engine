import { load, configure } from '../../../engine/main';

export const loadGame = async (resource) => {
    const game = await load(resource);
    configure(game.options);
    return game;
};
