export const initializeServiceWorker = (engine) => {
    const onlineListener = () => {
    };

    const offlineListener = () => {
    };

    listeners.set('online', onlineListener);
    listeners.set('offline', offlineListener);

    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        //serviceWorker.register('service-worker.js', { scope: '/' });
    }
};