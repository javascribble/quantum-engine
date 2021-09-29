import { plugins } from '../architecture/api.js';

export class StatePlugin {
    load(bridge, data) {
        //(new URL(document.location)).searchParams.get('scene')
    }
}

plugins.set('state', StatePlugin);