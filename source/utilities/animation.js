import { initializePrototypes } from './prototypes.js';

const { ObservableSet } = quantum;

export const initializeAnimation = async options => {
    const entities = new ObservableSet();
    const components = [];
    const systems = [];

    const { root, loadPrototype, loadPrototypes } = await initializePrototypes(options);
    const state = { root, loadPrototype, loadPrototypes, entities, components, systems };

    for (const plugin of this.plugins) await plugin(this, state);

    return time => {
        for (const system of systems) system.update(time);
        return this.isConnected;
    }
};