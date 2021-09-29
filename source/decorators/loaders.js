const { loaders, loadText, createTemplate } = quantum;

loaders.html = async url => createTemplate(await loadText(url));