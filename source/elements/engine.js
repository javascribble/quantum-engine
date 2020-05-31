import { Quantum, define } from '@javascribble/quantum';
import { expose } from '../application/bridge.js';
import { engine } from '../templates/engine.js';

export class Engine extends Quantum {
    constructor() {
        super(engine);

        expose(this);
    }
}

define(Engine);