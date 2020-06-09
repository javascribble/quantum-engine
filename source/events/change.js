import { observeSlot } from '../../references/quantum.js';

export const change = (dispatcher, elements, attributes) => {
    const observer = observeSlot(elements.slot);
    observer.onAdd = canvas => {
        canvas.load('/test/resources/kal16.png').then(image => {
            canvas.resize();
            canvas.render({
                image,
                sx: 0,
                sy: 0,
                sw: 16,
                sh: 16,
                dx: 100,
                dy: 100,
                dw: 16,
                dh: 16
            });
        })
    };

    //engine.loaders.png = loadImage;
    //engine.start();

    // this.entities = new Set();
    // this.add = (entity) => this.entities.add(entity);
    // this.delete = (entity) => this.entities.delete(entity);
    // this.validate = (entity) => entity.renderable;

    // const engine = this.parentElement;
    // engine.animations.add(this);
    // engine.systems.add(this);
};