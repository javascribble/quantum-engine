import { splitNewLines } from '../imports';
import { isValidLine } from '../utilities/strings';

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