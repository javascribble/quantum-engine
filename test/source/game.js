import { player } from './plugins/player.js';
import { world } from './plugins/world.js';

const { adapters, plugins } = document.querySelector('quantum-engine');

plugins.set('player', player);
plugins.set('world', world);