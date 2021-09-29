import { plugins } from '../architecture/api.js';
import '../decorators/loaders.js';

const { load, cloneTemplate } = quantum;

export class SourcePlugin {
    #templates = new Set();

    async load(bridge, data) {
        const { engine } = bridge;
        const { scripts, scriptRoot, templates, templateRoot } = data;

        if (Array.isArray(scripts)) {
            for (const script of scripts) {
                await import(`${scriptRoot}/${script}`);
            }
        }

        if (Array.isArray(templates)) {
            for (const template of templates) {
                this.#templates.add(engine.appendChild(cloneTemplate(await load(`${templateRoot}/${template}`))));
            }
        }
    }

    unload() {
        for (const template of this.#templates) {
            template.remove();
        }
    }
}

plugins.set('source', SourcePlugin);