import { enableGamePlugin } from './plugins/game.js';
import { enablePlayerPlugin } from './plugins/player.js';
import { enableScenePlugin } from './plugins/scene.js';
import { enableTilePlugin } from './plugins/tile.js';

const engine = document.querySelector('quantum-engine');
engine.plugins.push(engine => {
    enableGamePlugin(engine);
    enablePlayerPlugin(engine);
    enableScenePlugin(engine);
    enableTilePlugin(engine);
});