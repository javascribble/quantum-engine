export class VideoAdapter extends Set {
    constructor(engine) {
        super();
    }

    load(bridge, data) {
        const render = entity => {
            for (const renderer of this) {
                renderer.render(entity);
            }
        };

        return { render };
    }
}