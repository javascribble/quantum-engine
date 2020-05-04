export const services = new Map();

export const startServices = (options) => {
    for (const option in options) {
        if (services.has(option)) {
            services.get(option).enable(options[option], addEventListener);
        }
    }
};

export const stopServices = () => {
    for (const option in options) {
        if (services.has(option)) {
            services.get(option).disable(options[option], removeEventListener);
        }
    }
};