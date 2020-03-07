import { serviceWorker } from '../application/aliases';

export function enableOfflineSupport() {
   addEventListener('online', onlineListener);
   addEventListener('offline', offlineListener);

   if (serviceWorker) {
      //serviceWorker.register('service-worker.js', { scope: '/' });
   }   
}

function onlineListener() {

}

function offlineListener() {

}