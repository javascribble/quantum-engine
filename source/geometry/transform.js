import { createVector2 } from './vector2';
import { createVector3 } from './vector3';
import { createMatrix4, setMatrix4Translation, multiplyMatrix4 } from './matrix4';
import { captureShallowObjectChanges } from '../utilities/proxies';

export function createTransform2() {
    return {
        translation: captureShallowObjectChanges(createVector3()),
        rotation: captureShallowObjectChanges({ z: 0 }),
        scale: captureShallowObjectChanges(createVector2())
    }
}

export function createTransform3() {
    return {
        translation: captureShallowObjectChanges(createVector3()),
        rotation: captureShallowObjectChanges(createVector3()),
        scale: captureShallowObjectChanges(createVector3(1, 1, 1)),
    }
}

export function copyTransform2(transform, array, index) {
    // TODO: Only multiply the parts that have changed.

    let translation = transform.translation;
    let rotation = transform.rotation;
    let scale = transform.scale;
    let sin = Math.sin(rotation.z);
    let cos = Math.cos(rotation.z);
    array.set([cos * scale.x, sin * scale.x, 0, -sin * scale.y, cos * scale.y, 0, translation.x, translation.y, 1], index);
    //array.set([translation.x, translation.y, translation.z, rotation.z, scale.x, scale.y], index);
}

export function copyTransform3(transform, array, index) {
    // TODO: Only multiply the parts that have changed.

    let translation = createMatrix4();
    let rotation = createMatrix4();
    let scale = createMatrix4();
    setMatrix4Translation(translation, transform.translation);
    setMatrix4Rotation(rotation, transform.rotation);
    setMatrix4Scale(scale, transform.scale);

    let transformation = createMatrix4();
    multiplyMatrix4(translation, rotation, transformation);
    multiplyMatrix4(transformation, scale, transformation);

    array.set(transformation, index);
}