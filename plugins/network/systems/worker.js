const onlineListener = () => {
};

const offlineListener = () => {
};

export const enableWorkerSystem = (options, systems, updates, listeners) => {
    listeners.set('online', onlineListener);
    listeners.set('offline', offlineListener);

    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        //serviceWorker.register('service-worker.js', { scope: '/' });
    }
};
