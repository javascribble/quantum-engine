import { updates } from '../application/host';

export const enableNetwork = () => updates.push(updateNetwork);

const updateNetwork = (deltaTime) => {
    // TODO: Add web sockets.
};