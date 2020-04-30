import { createCanvas, getCanvasContext } from '../rendering/canvas';

export default (engine) => {
    const canvas = createCanvas();
    const context = getCanvasContext(canvas);
    engine.setElementParent(canvas, document.body);

    const renderables = new Set();
    engine.systems.set('renderable', renderables);
    engine.updates.add({
        update: (deltaTime) => {
            for (const renderable of renderables) {
                context.drawImage(renderable.image, 0, 0);
            }
        }
    });
};