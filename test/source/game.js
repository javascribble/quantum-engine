import { player } from './plugins/player.js';
import { world } from './plugins/world.js';
import './ui.js';

const { plugins } = document.querySelector('quantum-engine');
plugins.set('player', player);
plugins.set('world', world);