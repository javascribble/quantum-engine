import { enableGamePlugin } from './plugins/game.js';
import { enablePlayerPlugin } from './plugins/player.js';
import { enableScenePlugin } from './plugins/scene.js';
import { enableTilePlugin } from './plugins/tile.js';

const engine = document.querySelector('quantum-engine');
engine.plugins.add((api, engine) => {
    enableGamePlugin(api, engine);
    enablePlayerPlugin(api);
    enableScenePlugin(api);
    enableTilePlugin(api);
});