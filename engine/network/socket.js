import { updates } from '../application/host';

export const defaultNetworkOptions = {

};

export const enableNetwork = (options = defaultNetworkOptions) => updates.push(updateNetwork);

const updateNetwork = (deltaTime) => {
    // TODO: Add web sockets.
};