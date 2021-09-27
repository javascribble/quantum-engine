export class VideoAdapter extends Set {
    bridge = {
        render: this.render.bind(this)
    };

    load(engine, data) {

    }

    unload(engine) {

    }

    render(entity) {
        for (const renderer of this) {
            renderer.render(entity);
        }
    }
}