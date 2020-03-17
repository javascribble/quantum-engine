export function createCanvas() {
    return document.createElement('canvas');
}

export function getContext(canvas) {
    return canvas.getContext('gpu')
        || canvas.getContext('gpupresent');
}

export function resizeCanvas(canvas, scale) {
    const scaledWidth = canvas.clientWidth * scale;
    const scaledHeight = canvas.clientHeight * scale;
    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        return true;
    }

    return false;
}
