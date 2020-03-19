import { defaultVideoOptions } from '../imports';
import { registerSpriteSystem } from './sprite';

export async function registerVideoSystem(options = defaultVideoOptions) {
    registerSpriteSystem(options);
}