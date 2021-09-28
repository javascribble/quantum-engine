import { plugins } from '../architecture/api.js';

export class StatePlugin {
    load(bridge, data) {
        //(new URL(document.location)).searchParams.get('scene')
        return {};
    }

    unload() {
    }
}

plugins.set('state', StatePlugin);