import { assign } from '../utilities/objects';
import { updates } from '../application/host';

export const socketOptions = {
};

export const configureSocket = (options) => {
    assign(socketOptions, options);

    updates.push(updateSocket);
};

const updateSocket = (deltaTime) => {
    // TODO: Add web sockets.
};