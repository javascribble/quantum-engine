import { systems } from '../application/host';

export function enableNetwork() {
    systems.push(updateNetwork);
}

function updateNetwork(deltaTime) {
    // TODO: Add web sockets.
}