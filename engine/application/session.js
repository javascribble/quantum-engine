import { addEventListeners, removeEventListeners } from './browser';
import { startAnimation, stopAnimation } from './host';
import { startModules, stopModules } from './modules';

export const start = async (options) => {
    await startModules(options);
    resume();
};

export const pause = () => {
    stopAnimation();
    removeEventListeners();
}

export const resume = () => {
    addEventListeners();
    startAnimation();
};

export const stop = async () => {
    pause();
    await stopModules();
};