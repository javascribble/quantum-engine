import { plugins, updates } from '../../../engine/main';

export const defaultSocketOptions = {
};

const updateSocket = (deltaTime) => {
    // TODO: Add web sockets.
};

plugins.socket = (socketOptions) => {
    const options = {
        ...defaultSocketOptions,
        ...socketOptions
    };

    updates.push(updateSocket);
};
