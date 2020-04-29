import { createCanvas, getCanvasContext } from '../rendering/canvas';

export default (engine) => {
    const canvas = createCanvas();
    const context = getCanvasContext(canvas);
    engine.setElementParent(canvas, document.body);

    engine.systems.add({
        validate: (entity) => entity.renderable,
        add: (entity) => {

        },
        remove: (entity) => {

        }
    });

    engine.executables.add({
        execute: (deltaTime) => {

        }
    });
};