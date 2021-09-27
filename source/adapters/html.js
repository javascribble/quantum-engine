const { loadText, createTemplate, cloneTemplate } = quantum;

export class HtmlAdapter extends Set {
    #templates = new Set();

    bridge = {
        getResource: this.getResource.bind(this)
    };

    async load(engine, data) {
        const { scripts, scriptRoot, templates, templateRoot } = data;

        if (Array.isArray(scripts)) {
            for (const script of scripts) {
                const url = `${scriptRoot}/${script}`;
                if (!this.getResource(script, url)) {
                    await import(url);
                }
            }
        }

        if (Array.isArray(templates)) {
            for (const template of templates) {
                const url = `${templateRoot}/${template}`;
                this.#templates.add(engine.appendChild(cloneTemplate(this.getResource(template, url) ?? createTemplate(await loadText(url)))));
            }
        }
    }

    unload(engine) {
        for (const template of this.#templates) {
            engine.removeChild(template);
        }

        this.#templates.clear();
    }

    getResource(id, src) {
        for (const element of this) {
            if (element.id === id || element.src === src) {
                return element;
            }
        }
    }
}