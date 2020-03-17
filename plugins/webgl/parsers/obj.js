import { loadResource, splitNewLines } from '../imports';
import { loadMaterial } from './mtl';

const materials = [];
const meshes = [];

export async function loadMesh(resource) {
    await parseText(await loadResource(name), parseObj);
}

async function parseText(text, wordParser) {
    const lines = splitNewLines(text).filter(isValid);
    for (const line of lines) {
        await wordParser(line.split(' ').reverse());
    }
}

async function parseObj(words) {
    const mesh = lastElement(meshes);
    switch (words.pop()) {
        case 'mtllib':
            await parseText(await loadMaterial(words.pop()));
            break;
        case 'usemtl':
            const materialName = words.pop();
            for (const material of materials) {
                if (material.name === materialName) {
                    //mesh.colorComponents.push(material.color); 
                    break;
                }
            }

            break;
        case 'o':
            meshes.push(new Mesh(words.pop()));
            break;
        case 'v':
            parseArray(words, mesh.vertexComponents, parseFloat, 3);
            break;
        case 'vt':
            parseArray(words, mesh.colorComponents, parseFloat, 2);
            break;
        case 'vn':
            parseArray(words, mesh.normalComponents, parseFloat, 3);
            break;
        case 'f':
            for (let i = 0; i < 3; i++) {
                const indices = words.pop().split('/');
                mesh.normalIndices.push(parseFloat(indices.pop()));
                mesh.colorIndices.push(parseFloat(indices.pop()));
                mesh.vertexIndices.push(parseFloat(indices.pop()));
            }

            break;
    }
}

function parseArray(source, target, parser, count) {
    for (let i = 0; i < count; i++) {
        target.push(parser(source.pop()));
    }
}

function isValid(line) {
    return line && !line.startsWith('#');
}