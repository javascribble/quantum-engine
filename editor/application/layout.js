import { persistResize } from '../input/resizing.js';

export const configureLayout = (root) => {
    persistResize(root, '#objects', ['width'], ['300px']);
    persistResize(root, '#properties', ['width'], ['300px']);
    persistResize(root, '#viewport', ['width', 'height'], ['300px', '300px']);
};