export const saveJson = (key, object) => localStorage.setItem(key, JSON.stringify(object));

export const loadJson = (key) => localStorage.hasOwnProperty(key) && JSON.parse(localStorage.getItem(key));

export const saveStyles = (element, properties) => {
    const style = element.style;
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        localStorage.setItem(`${element.id}-${property}`, style[property]);
    }
};

export const loadStyles = (element, properties, defaults) => {
    const style = element.style;
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        style[property] = localStorage.getItem(`${element.id}-${property}`) || defaults[i];
    }
};