export const player = {
    load: async (bridge, data) => {
        const { input, video, architecture } = bridge;
        const { systems } = architecture;

        systems.add({
            validate: entity => entity.player && entity.world,
            update: (entities, time) => {
                for (const entity of entities) {
                    const { translation } = entity.player.transform;
                    if (input.getState('UP')) {
                        translation.y -= 5;
                    } else if (input.getState('DOWN')) {
                        translation.y += 5;
                    } else if (input.getState('LEFT')) {
                        translation.x -= 5;
                    } else if (input.getState('RIGHT')) {
                        translation.x += 5;
                    }

                    video.render(entity);
                }
            }
        });
    },
    unload: () => { }
};