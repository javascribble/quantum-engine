import { splitNewLines } from '../../../engine/main';
import { isValidLine } from '../utilities/strings';

export const parseMtl = async (text) => {
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
};