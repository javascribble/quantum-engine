import { output } from '../Application/engine';
import { devicePixelRatio } from '../Application/aliases';
import { createManagedVideoContext } from './video/renderers/webgl/manager';
import { setContextAnchor, resizeContext } from './video/renderers/webgl/context';
import { renderContext } from './video/renderers/webgl/renderer';

export const defaultVideoOptions = {
    anchor: document.body,
    scale: devicePixelRatio
}

export function createVideo(options = defaultVideoOptions) {
    let context = createManagedVideoContext();
    let video = {
        resources: {},
        strategy: {},
        context,
        options
    };

    output.push(render(video));
    return video;
}

function render(video) {
    return function renderVideo(deltaTime) {
        let context = video.context;
        let options = video.options;
        resizeContext(context, options.scale);
        setContextAnchor(context, options.anchor);
        renderContext(context, video.strategy, deltaTime);
    };
}

function addScene(entity) {
    allocateVideoHandles(context, entity.scene.resources);
}

function deleteScene(entity) {
    deallocateVideoHandles(context, entity.scene.resources);
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
