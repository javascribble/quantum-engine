import { loadResource, splitNewLines } from '../imports';
import { parseArray, isValidLine } from '../utilities/parsing';
import { loadMtl } from './mtl';

export async function loadObj(resource) {
    return await parseObj(await loadResource(resource));
}

export async function parseObj(text) {
    let mesh;
    let meshes = [];
    let materials = [];
    const lines = splitNewLines(text).filter(isValidLine);
    for (const line of lines) {
        const words = line.split(' ');
        switch (words.shift()) {
            case 'mtllib':
                words.shift();
                //materials = materials.concat(await loadMtl());
                break;
            case 'usemtl':
                const materialName = words.shift();
                for (const material of materials) {
                    if (material.name === materialName) {
                        //mesh.colorComponents.push(material.color); 
                        break;
                    }
                }

                break;
            case 'o':
                mesh = { 
                    name: words.shift(),
                    vertexIndices: [],
                    normalIndices: [],
                    colorIndices: [],
                    vertices: [],
                    normals: [],
                    colors: []
                };

                meshes.push(mesh);
                break;
            case 'v':
                mesh.vertices.push(words.map(parseFloat));
                break;
            case 'vt':
                mesh.colors.push(words.map(parseFloat));
                break;
            case 'vn':
                mesh.normals.push(words.map(parseFloat));
                break;
            case 'f':
                for (let i = 0; i < 3; i++) {
                    const indices = words.shift().split('/');
                    mesh.normalIndices.push(parseFloat(indices.pop()));
                    mesh.colorIndices.push(parseFloat(indices.pop()));
                    mesh.vertexIndices.push(parseFloat(indices.pop()));
                }

                break;
        }
    }

    return {
        materials,
        meshes
    };
}
