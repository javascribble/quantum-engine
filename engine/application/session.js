import { startAnimation, stopAnimation } from './animation.js';
import { startServices, stopServices } from './services.js';
import { startPlugins, stopPlugins } from './plugins.js';

export const start = (options) => {
    startPlugins(options);
    startServices(options);
    startAnimation();
};

export const stop = () => {
    stopAnimation();
    stopServices();
    stopPlugins();
};