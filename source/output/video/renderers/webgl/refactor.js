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
