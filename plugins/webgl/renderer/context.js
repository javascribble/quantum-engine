import { setElementParent, firstSubstring } from '../imports';
import { getWebGLContext, createCanvas, resizeCanvas } from './canvas';

export const webGLExtensions = ['ANGLE_instanced_arrays'];

export function createWebGLContext(options) {
    const canvas = createCanvas();
    const context = getWebGLContext(canvas);
    setElementParent(canvas, options.parent);
    applyOptionsAndExtensions(context);
    return context;
}

export function applyOptionsAndExtensions(context) {
    context.enable(context.DEPTH_TEST);
    context.enable(context.BLEND);
    context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
    context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);

    for (const extensionName of webGLExtensions) {
        const vendorName = firstSubstring(extensionName, extensionName.indexOf('_'));
        const extension = context.getExtension(extensionName);
        for (const memberName in extension) {
            const isConstant = memberName.includes('_');
            const vendorNameTrimIndex = memberName.indexOf(vendorName) - (isConstant ? 1 : 0);
            const memberNameWithoutVendorName = firstSubstring(memberName, vendorNameTrimIndex);
            context[memberNameWithoutVendorName] = isConstant ? extension[memberName] : extension[memberName].bind(extension);
        }
    }
}

export function resizeContext(context, scale) {
    if (resizeCanvas(context.canvas, scale)) {
        context.viewport(0, 0, context.drawingBufferWidth, context.drawingBufferHeight);
    }
}
