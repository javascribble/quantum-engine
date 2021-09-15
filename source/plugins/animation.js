const { animate } = quantum;

export const animation = {
    load: function (adapters, plugins, data) {
        this.updates = [];
        this.animation = animate(time => {
            for (const update of this.updates) {
                update(time);
            }
        });

        this.animation.start();
    },
    unload: function (adapters, plugins) {
        this.animation.stop();
    }
};