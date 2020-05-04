import { eventListeners } from '../application/browser.js';

const online = () => {
};

const offline = () => {
};

eventListeners.set('online', online);
eventListeners.set('offline', offline);