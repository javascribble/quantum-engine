import { startAnimation, stopAnimation } from './host';
import { configure } from './plugins';

export const start = (options) => {
    configure(options);
    startAnimation();
};

export const pause = () => {
    stopAnimation();
};

export const unpause = () => {
    startAnimation();
};

export const stop = () => {
    stopAnimation();
};