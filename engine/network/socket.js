import { listeners } from '../application/browser';

const online = () => {
};

const offline = () => {
};

listeners.set('online', online);
listeners.set('offline', offline);