export const defineProperty = Object.defineProperty;

export const hasOwnProperties = (object, properties) => properties.every(property => object.hasOwnProperty(property));