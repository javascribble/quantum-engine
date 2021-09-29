const { getAttribute } = quantum;

export const getAdapter = element => getAttribute(element, 'adapter') || 'html';

export const getResource = element => getAttribute(element, 'resource');