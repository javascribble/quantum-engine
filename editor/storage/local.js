export const syncStyles = (document, selector, properties, defaults, delay) => {
    let style = document.querySelector(selector).style;
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        const key = `${selector}-${property}`;
        let value = style[property] = localStorage.getItem(key) || defaults[i];
        setInterval(() => {
            if (style[property] !== value) {
                value = style[property];
                localStorage.setItem(key, value);
            }
        }, delay || 1000);
    }
};