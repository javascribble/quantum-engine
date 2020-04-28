import * as engine from '../../engine/main';
import { initializeWebSocket } from './communication/webSocket';
import { initializeServiceWorker } from './availability/serviceWorker';

initializeWebSocket(engine);
initializeServiceWorker(engine);
