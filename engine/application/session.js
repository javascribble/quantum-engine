import { subscribeEvents, unsubscribeEvents } from './browser';
import { startAnimation, stopAnimation } from './host';
import { configure } from './plugins';
import { publish } from './events';

export const start = async (options) => {
    await configure(options);
    resume();
};

export const pause = () => {
    unsubscribeEvents();
    stopAnimation();
}

export const resume = () => {
    subscribeEvents();
    startAnimation();
};

export const stop = () => {
    pause();
    publish('shutdown');
};