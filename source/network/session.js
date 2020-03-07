import { serviceWorker } from '../application/aliases';

addEventListener('online', onlineListener);
addEventListener('offline', offlineListener);

if (serviceWorker) {
   //serviceWorker.register('service-worker.js', { scope: '/' });
}

function onlineListener() {

}

function offlineListener() {

}