import { plugins, assign, addListener } from '../../../engine/main';

export const workerOptions = {
};

const onlineListener = () => {
};

const offlineListener = () => {
};

plugins.worker = (options) => {
    assign(workerOptions, options);

    addListener('online', onlineListener);
    addListener('offline', offlineListener);

    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        //serviceWorker.register('service-worker.js', { scope: '/' });
    }
};
