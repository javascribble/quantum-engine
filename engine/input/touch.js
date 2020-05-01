import { listeners } from '../application/browser';

const touchStart = (event) => {
};

const touchMove = (event) => {
};

const touchEnd = (event) => {
};

const touchCancel = (event) => {
};

listeners.set('touchstart', touchStart);
listeners.set('touchmove', touchMove);
listeners.set('touchend', touchEnd);
listeners.set('touchcancel', touchCancel);