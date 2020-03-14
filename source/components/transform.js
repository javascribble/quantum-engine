import { captureShallowObjectChanges } from '../utilities/proxies';
import { v3 } from '../geometry/vector3';

export const transformComponent = 'transform';

export function createTransform() {
    return {
        translation: captureShallowObjectChanges(v3.create()),
        rotation: captureShallowObjectChanges(v3.create()),
        scale: captureShallowObjectChanges(v3.create(1, 1, 1)),
    };
}