import { assign } from '../utilities/objects';
import { addListener } from '../application/browser';

export const workerOptions = {
};

export const configureWorker = (options) => {
   assign(workerOptions, options);

   addListener('online', onlineListener);
   addListener('offline', offlineListener);

   const serviceWorker = navigator.serviceWorker;
   if (serviceWorker) {
      //serviceWorker.register('service-worker.js', { scope: '/' });
   }
};

const onlineListener = () => {
};

const offlineListener = () => {
};