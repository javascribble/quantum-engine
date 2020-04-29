export default (engine) => {
    const onlineListener = () => {
    };

    const offlineListener = () => {
    };

    const listeners = engine.listeners;
    listeners.set('online', onlineListener);
    listeners.set('offline', offlineListener);

    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        //serviceWorker.register('service-worker.js', { scope: '/' });
    }
};