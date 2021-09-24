export const importAll = async scripts => {
    if (Array.isArray(scripts)) {
        for (const script of scripts) {
            await import(script);
        }
    }
};