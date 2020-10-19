import * as types from '../constants/scene.js';

// api.loadMap = async index => this.#tiles.set(index, await loadTiles(options.maps[index], api.loadResource));
// api.drawMap = index => drawTiles(options.maps[index], this.#tiles.get(index), api.drawSprite);

// async integrate(api) {
//     const { options } = api;

//     api.loadScene = async index => {
//         const scene = { ...options.scenes[index] };
//         await loadScene(scene, api.loadMap);
//         this.#scenes.set(index, scene);
//     };

//     api.applyScene = index => applyScene(this.#scenes.get(index), api.drawMap);;

//     // api.unapplyScene = 
//     // api.clearScene = 

//     for (const defaultScene of options.defaultScenes) {
//         await api.loadScene(defaultScene);
//         api.applyScene(defaultScene);
//     }
// }

export const loadScene = async (scene, loadMap) => {
    switch (scene.type) {
        case types.sceneType2d:
        case types.sceneType3d:
        case types.sceneTypeMixed:
        default:
            for (const map of scene.maps) {
                await loadMap(map);
            }

            break;
    }
};

export const applyScene = (scene, drawMap) => {
    switch (scene.type) {
        case types.sceneType2d:
        case types.sceneType3d:
        case types.sceneTypeMixed:
        default:
            for (const map of scene.maps) {
                quantum.animate(() => {
                    drawMap(map);
                    return true;
                });
            }

            break;
    }
};