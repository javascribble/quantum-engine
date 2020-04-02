import { addListener } from '../utilities/aliases';

const defaultWorkerOptions = {
};

const onlineListener = () => {
};

const offlineListener = () => {
};

export const createWorkerSystem = (workerOptions) => {
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

    return {};
};
