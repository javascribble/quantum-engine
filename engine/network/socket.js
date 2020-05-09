import { addListener } from '../aliases/browser.js';

const online = () => {
};

const offline = () => {
};

addListener('online', online);
addListener('offline', offline);