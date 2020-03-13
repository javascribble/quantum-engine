import { captureShallowObjectChanges } from '../utilities/proxies';
import { v2 } from '../geometry/vector2';
import { v3 } from '../geometry/vector3';

export const transformComponent = 'transform';

export function createTransform2d() {
    return {
        translation: captureShallowObjectChanges(v3.create()),
        rotation: captureShallowObjectChanges({ z: 0 }),
        scale: captureShallowObjectChanges(v2.create()),
    };
}

export function createTransform3d() {
    return {
        translation: captureShallowObjectChanges(v3.create()),
        rotation: captureShallowObjectChanges(v3.create()),
        scale: captureShallowObjectChanges(v3.create(1, 1, 1)),
    }
}