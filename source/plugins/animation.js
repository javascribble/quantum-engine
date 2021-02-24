const { animate } = quantum;

export const animationPlugin = engine => {
    const updates = [];
    const update = time => {
        for (const update of updates) update(time);
    };

    Object.assign(engine, { updates, animation: animate(update) });
};