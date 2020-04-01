import { assign } from '../utilities/objects';

export const videoOptions = {
    scale: devicePixelRatio,
    parent: document.body
};

export const configureVideo = (options) => assign(videoOptions, options);