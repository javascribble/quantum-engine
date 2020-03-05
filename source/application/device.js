import { userAgent } from './aliases';

export const isTv = userAgent.match(/webOS/i);

export const isMobile =
    userAgent.match(/Android/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPod/i) ||
    userAgent.match(/BlackBerry/i) ||
    userAgent.match(/Windows Phone/i); 