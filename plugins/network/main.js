import { plugins, updates, systems } from '../../engine/main';
import { createSocketSystem } from './systems/socket';
import { createWorkerSystem } from './systems/worker';

const defaultNetworkOptions = {
};

plugins.network = (networkOptions) => {
    const options = {
        ...defaultNetworkOptions,
        ...networkOptions
    };

    const socketSystem = createSocketSystem(options);
    const workerSystem = createWorkerSystem(options);

    updates.push(socketSystem.update);
};
