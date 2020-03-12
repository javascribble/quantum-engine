import { firstSubstring } from '../utilities/string';
import { setElementAnchor } from '../../application/browser';
import { createCanvas, resizeCanvas, defaultCanvasOptions } from './canvas';

export const defaultWebGLOptions = {
    extensions: ['ANGLE_instanced_arrays'],
    canvasOptions: defaultCanvasOptions
}

export function createCanvas3dContext(options = defaultWebGLOptions) {
    let canvas = createCanvas();


    applyOptionsAndExtensions(context);
    return context;
}

export function applyOptionsAndExtensions(context) {
    context.enable(context.DEPTH_TEST);
    context.enable(context.BLEND);
    context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
    context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);

    for (const extensionName of defaultVideoContextOptions.extensions) {
        let vendorName = firstSubstring(extensionName, extensionName.indexOf('_'));
        let extension = context.getExtension(extensionName);
        for (const memberName in extension) {
            let isConstant = memberName.includes('_');
            let vendorNameTrimIndex = memberName.indexOf(vendorName) - (isConstant ? 1 : 0);
            let memberNameWithoutVendorName = firstSubstring(memberName, vendorNameTrimIndex);
            context[memberNameWithoutVendorName] = isConstant ? extension[memberName] : extension[memberName].bind(extension);
        }
    }
}

export function setContextAnchor(context, anchor) {
    setElementAnchor(context.canvas, anchor);
}

export function resizeContext(context, scale) {
    if (resizeCanvas(context.canvas, scale)) {
        context.viewport(0, 0, context.drawingBufferWidth, context.drawingBufferHeight);
    }
}
