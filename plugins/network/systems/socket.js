import { plugins, updates, assign } from '../../../engine/main';

export const socketOptions = {
};

const updateSocket = (deltaTime) => {
    // TODO: Add web sockets.
};

plugins.socket = (options) => {
    assign(socketOptions, options);

    updates.push(updateSocket);
};
