const { animate } = quantum;

export class AnimationPlugin {
    #updates = new Set();

    animation = animate(this.animate.bind(this));

    load(bridge, data) {
        this.animation.start();

        return { updates: this.#updates };
    }

    unload() {
        this.#updates.clear();
        this.animation.stop();
    }

    animate(time) {
        for (const update of this.#updates) {
            update(time);
        }
    }
}