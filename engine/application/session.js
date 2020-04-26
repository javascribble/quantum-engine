import { subscribeEvents, unsubscribeEvents } from './browser';
import { startAnimation, stopAnimation } from './host';
import { startPlugins, stopPlugins } from './plugins';

export const start = async (options) => {
    await startPlugins(options);
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

export const stop = async () => {
    pause();
    await stopPlugins();
};