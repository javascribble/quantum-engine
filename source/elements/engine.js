import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    #broker = new quantum.EventBroker();

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = quantum.template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        quantum.load(currentValue).then(options => this.load(options));
    }

    load(options) {
        const state = { broker: this.#broker };
        for (const [slot, elements] of this.slottedElements) {
            for (const element of elements) {
                element.configure?.(options, state);
            }
        }

        // Testing
        // quantum.loadMany(options.resources, console.log).then(resources => {
        //     const sprite = { ...options.canvas[0], image: resources[0] };

        //     this.#broker.subscribe('MoveUp', _ => sprite.dy -= 10);
        //     this.#broker.subscribe('MoveDown', _ => sprite.dy += 10);
        //     this.#broker.subscribe('MoveLeft', _ => sprite.dx -= 10);
        //     this.#broker.subscribe('MoveRight', _ => sprite.dx += 10);

        //     quantum.animate(() => {
        //         this.#broker.publish('drawSprite', sprite);
        //         return true;
        //     });
        // });

        this.#broker.publish('reset');
        this.onload?.();
    }
}

quantum.define('quantum-engine', Engine);