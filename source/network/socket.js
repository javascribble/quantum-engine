import { systems } from '../application/host';

export const enableNetwork = () => systems.push(updateNetwork);

const updateNetwork = (deltaTime) => {
    // TODO: Add web sockets.
}