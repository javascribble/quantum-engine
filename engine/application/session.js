import { addEventListeners, removeEventListeners } from '../utilities/browser.js';
import { startAnimation, stopAnimation } from './host.js';
import { startPlugins, stopPlugins } from './plugins.js';

export const start = (options) => {
    startPlugins(options);
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

export const stop = () => {
    pause();
    stopPlugins();
};