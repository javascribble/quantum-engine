import { setElementParent, defaultVideoOptions } from '../imports';
import { createManagedWebGLContext } from '../renderer/manager';
import { createWebGLRenderer } from '../renderer/renderer';
import { registerSpriteSystem } from './sprite';

export async function registerVideoSystem(options = defaultVideoOptions) {
    registerSpriteSystem(options);
}