import { subscribeEvents, unsubscribeEvents } from './browser';
import { startAnimation, stopAnimation } from './host';
import { startModules, stopModules } from './modules';

export const start = async (options) => {
    await startModules(options);
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
    await stopModules();
};