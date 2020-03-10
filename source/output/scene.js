import { loadResource } from '../network/resources';
import { loadResourceGroup } from './video/renderers/webgl/resources'
import { allocateVideoHandles, deallocateVideoHandles } from './video/renderers/webgl/handles'

export async function loadScene(resource) {
    let scene = await loadResource(resource);
    await loadResourceGroup(scene.resources);
    return scene;
}

export function createScene(scene, audio, video) {
    allocateVideoHandles(video, scene.resources.video);
}

export function deleteScene(scene, audio, video) {
    deallocateVideoHandles(video, scene.resources.video);
}


// let entity = createEntity();
// let tranform = createTransform2();
// entity.movement = {
//     tranform,
//     renderable: {
//         program: video.resources.defaultProgram,
//         staticBuffer: video.resources.staticBuffer,
//         dynamicBuffer: video.resources.dynamicBuffer,
//         texture: video.resources.defaultTexture,
//         0
//         }
// };

// let transform = character.movement.transform;
// transform.translation.x = Math.random() * 100;
// transform.translation.y = Math.random() * 100;
// transform.translation.z = Math.random() - 1;
// transform.rotation.z = convertDegreesToRadians(45);
// transform.scale.x = 2;//Math.random() * 2;
// transform.scale.y = 2;//Math.random() * 2;

// let audio = createAudio();
// let video = createVideo();
// let scene = await loadScene('scene.json');
// createScene(scene, audio, video);

// let components = matrix3Components;
// let count = 100;
// video.resources.dynamicBuffer.data = new Float32Array(components * count);
// for (let index = 0; index < count; index++) {
//     copyTransform2(transform, video.resources.dynamicBuffer.data, index * components);
// }

// let context = video.context;
// video.strategy.defaultPass = {
//     program: video.resources.defaultProgram,
//     buffers: [
//         video.resources.staticBuffer,
//         video.resources.dynamicBuffer
//     ],
//     textures: [video.resources.defaultTexture],
//     draw: () => context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, count)
// };