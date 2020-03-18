import { loadResource, splitNewLines } from '../imports';
import { parseArray, isValidLine } from '../utilities/parsing';

export async function loadMtl(resource) {
    return await parseMtl(await loadResource(resource));
}

export async function parseMtl(text) {
    let material;
    const materials = [];
    const lines = splitNewLines(text).filter(isValidLine);
    for (const line of lines) {
        const words = line.split(' ').reverse();
        switch (words.pop()) {
            case 'newmtl':
                material = { 
                    name: words.pop()
                };

                materials.push(material);
                break;
            case 'Kd':
                material.color = words.map(parseFloat);
                break;
        }
    }

    return materials;
}