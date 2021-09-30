import '../decorators/loaders.js';

const { load, cloneTemplate } = quantum;

export class SourcePlugin {
    #templates = new Set();
    #engine;

    constructor(engine) {
        this.#engine = engine;
    }

    async load(bridge, data) {
        const { imports, templates, templateRoot } = data;

        if (Array.isArray(imports)) {
            for (const { scripts, scriptRoot } of imports) {
                for (const script of scripts) {
                    await load(`${scriptRoot}/${script}`);
                }
            }
        }

        if (Array.isArray(templates)) {
            for (const template of templates) {
                this.#templates.add(this.#engine.appendChild(cloneTemplate(await load(`${templateRoot}/${template}`))));
            }
        }
    }

    unload() {
        for (const template of this.#templates) {
            template.remove();
        }

        this.#templates.clear();
    }
}