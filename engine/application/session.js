import { subscribeEvents, unsubscribeEvents } from './browser';
import { startAnimation, stopAnimation } from './host';
import { configure } from './plugins';

export const start = async (options) => {
    await configure(options);
    resume();
};

export const resume = () => {
    subscribeEvents();
    startAnimation();
};

export const stop = () => {
    unsubscribeEvents();
    stopAnimation();
};