import { enableGamePlugin } from './systems/game.js';
import { enablePlayerPlugin } from './systems/player.js';
import { enableScenePlugin } from './systems/scene.js';
import { enableTilePlugin } from './systems/tile.js';

const engine = document.querySelector('quantum-engine');
engine.plugins.push(engine => {
    enableGamePlugin(engine);
    enablePlayerPlugin(engine);
    enableScenePlugin(engine);
    enableTilePlugin(engine);

    await loadPrototype(prototypeRoot)
});