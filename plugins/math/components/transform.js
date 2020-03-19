import { captureShallowObjectChanges } from '../imports';

export const transformComponent = 'transform';

export const createTransform = () => ({
    translation: captureShallowObjectChanges({ x: 0, y: 0, z: 0 }),
    rotation: captureShallowObjectChanges({ x: 0, y: 0, z: 0 }),
    scale: captureShallowObjectChanges({ x: 1, y: 1, z: 1 }),
});
