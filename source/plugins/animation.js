const { animate } = quantum;

export class AnimationPlugin {
    bridge = {
        updates: new Set()
    };

    load(bridge, data) {
        const { updates } = this.bridge;

        this.animation = animate(time => {
            for (const update of updates) {
                update(time);
            }
        });

        this.animation.start();
    }

    unload() {
        this.animation.stop();

        delete this.animation;
    }
}