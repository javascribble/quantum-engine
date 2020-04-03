import { systems, updates, listeners } from '../../../engine/main';

const defaultWorkerOptions = {
};

const onlineListener = () => {
};

const offlineListener = () => {
};

export const enableWorkerSystem = (workerOptions) => {
    const options = {
        ...defaultWorkerOptions,
        ...workerOptions
    };

    listeners.set('online', onlineListener);
    listeners.set('offline', offlineListener);

    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        //serviceWorker.register('service-worker.js', { scope: '/' });
    }
};
