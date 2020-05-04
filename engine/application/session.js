import { addEventListeners, removeEventListeners } from './browser.js';
import { startAnimation, stopAnimation } from './host.js';
import { startModules, stopModules } from './modules.js';

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