import { Quantum, define } from '../../references/quantum.js';
import { engine } from '../templates/engine.js';
import { change } from '../events/change.js';

export class Engine extends Quantum {
    constructor() {
        super(engine);
    }

    static attributes = {
    };

    static elements = {
        slot: 'slot'
    };

    static events = {
        change
    };
}

define(Engine);