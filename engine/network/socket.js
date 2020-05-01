import { eventListeners } from '../application/browser';

const online = () => {
};

const offline = () => {
};

eventListeners.set('online', online);
eventListeners.set('offline', offline);