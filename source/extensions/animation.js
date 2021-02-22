import { Engine } from '../elements/engine.js';

export const initializeAnimation = async () => {

    return time => {
        for (const system of systems) system.update(time);
        return this.isConnected;
    }
};