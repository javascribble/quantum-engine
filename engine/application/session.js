import { subscribeEvents, unsubscribeEvents } from './browser';
import { startAnimation, stopAnimation } from './host';
import { shutdownEvent } from './constants';
import { configure } from './plugins';
import { publish } from './events';

export const start = async (options) => {
    await configure(options);
    resume();
};

export const pause = () => {
    stopAnimation();
    unsubscribeEvents();
}

export const resume = () => {
    subscribeEvents();
    startAnimation();
};

export const stop = () => {
    pause();
    publish(shutdownEvent);
};