import { lastArrayElement } from '../utilities/arrays';

export async function loadMaterial(resource) {
    let words = await loadResource(resource);
    switch (words.pop()) {
        case 'newmtl':
            materials.push(new Material(words.pop()));
            break;
        case 'Kd':
            parseArray(words, lastArrayElement(materials).color, parseFloat, 3);
            break;
        default:
            return;
    }
}