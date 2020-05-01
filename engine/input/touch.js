import { eventListeners } from '../application/browser';

const touchStart = (event) => {
};

const touchMove = (event) => {
};

const touchEnd = (event) => {
};

const touchCancel = (event) => {
};

eventListeners.set('touchstart', touchStart);
eventListeners.set('touchmove', touchMove);
eventListeners.set('touchend', touchEnd);
eventListeners.set('touchcancel', touchCancel);