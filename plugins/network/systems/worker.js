import { plugins, addListener } from '../../../engine/main';

export const defaultWorkerOptions = {
};

const onlineListener = () => {
};

const offlineListener = () => {
};

plugins.worker = (workerOptions) => {
    const options = {
        ...defaultWorkerOptions,
        ...workerOptions
    };

    addListener('online', onlineListener);
    addListener('offline', offlineListener);

    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        //serviceWorker.register('service-worker.js', { scope: '/' });
    }
};
