import { adapters } from '../architecture/api.js';

export class VideoAdapter extends Set {
    load(bridge, data) {
        const render = entity => {
            for (const renderer of this) {
                renderer.render(entity);
            }
        };

        return { render };
    }
}

adapters.set('video', VideoAdapter);