export const initializeServiceWorker = (engine) => {
    const onlineListener = () => {
    };

    const offlineListener = () => {
    };

    const events = engine.events;
    events.set('online', onlineListener);
    events.set('offline', offlineListener);

    const serviceWorker = navigator.serviceWorker;
    if (serviceWorker) {
        //serviceWorker.register('service-worker.js', { scope: '/' });
    }
};