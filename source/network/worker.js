export function enableOfflineSupport() {
   addEventListener('online', onlineListener);
   addEventListener('offline', offlineListener);

   const serviceWorker = navigator.serviceWorker;
   if (serviceWorker) {
      //serviceWorker.register('service-worker.js', { scope: '/' });
   }   
}

function onlineListener() {

}

function offlineListener() {

}