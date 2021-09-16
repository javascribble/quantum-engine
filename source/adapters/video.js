export class VideoAdapter extends Set {
    get bridge() {
        return {
            render: this.render.bind(this)
        }
    }

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