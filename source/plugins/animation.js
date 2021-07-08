const { Engine } = Quantum;
const { animate } = quantum;

Engine.plugins.add({
    load: engine => {
        const updates = [];
        const animation = animate(time => {
            for (const update of updates) update(time);
        });

        animation.start();

        engine.updates = updates;
        engine.animation = animation;
    },
    unload: engine => {
        engine.animation?.stop();

        delete engine.updates;
        delete engine.animation;
    }
});