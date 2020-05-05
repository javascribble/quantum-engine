import { addEventListeners, removeEventListeners } from '../utilities/browser.js';
import { startAnimation, stopAnimation } from './animation.js';

export const start = () => {
    addEventListeners();
    startAnimation();
};

export const stop = () => {
    removeEventListeners();
    stopAnimation();
};