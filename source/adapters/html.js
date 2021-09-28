import { adapters } from '../architecture/api.js';

const { loadText, createTemplate, cloneTemplate } = quantum;

export class HtmlAdapter extends Set {
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
                this.#templates.add(engine.appendChild(cloneTemplate(createTemplate(await loadText(`${templateRoot}/${template}`)))));
            }
        }

        return { elements: this };
    }

    unload() {
        for (const template of this.#templates) {
            template.remove();
        }
    }
}

adapters.set('html', HtmlAdapter);