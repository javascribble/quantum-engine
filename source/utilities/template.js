const { loadText, createTemplate, cloneTemplate } = quantum;

export const appendAll = async (parent, accumulator, templates) => {
    if (Array.isArray(templates)) {
        for (const template of templates) {
            accumulator.add(parent.appendChild(cloneTemplate(createTemplate(await loadText(template)))));
        }
    }
};