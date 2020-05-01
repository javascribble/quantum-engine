export default (engine) => {
    const canvas = engine.createCanvas();
    const context = canvas.getContext('2d', engine.defaultCanvasOptions);

    engine.setElementParent(canvas, document.body);
    engine.resizeCanvas(canvas);

    const renderables = new Set();
    engine.systems.set('renderable', {
        add: (renderable) => {
            // TODO: Implement custom and default placeholders.
            engine.extensions.loadResource(renderable.image).then(image => {
                renderable.image = image;
                renderables.add(renderable);
            });
        },
        delete: (renderable) => {
            renderables.delete(renderable);
        }
    });

    engine.updates.add({
        update: (deltaTime) => {
            for (const { image, sx, sy, sw, sh, dx, dy, dw, dh } of renderables) {
                context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
            }
        }
    });
};