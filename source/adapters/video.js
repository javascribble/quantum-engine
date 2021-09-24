export class VideoAdapter extends Set {
    bridge = {
        render: this.render.bind(this)
    };

    load(data) {

    }

    unload() {

    }

    render(entity) {
        for (const renderer of this) {
            renderer.render(entity);
        }
    }
}