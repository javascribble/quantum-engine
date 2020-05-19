export const preventDefaultHandler = (event) => event.preventDefault();

export const stopPropagationHandler = (event) => event.stopPropagation();

export const addListener = (element, event, handler) => element.addEventListener(event, handler);

export const removeListener = (element, event, handler) => element.addEventListener(event, handler);

export const addPreventDefault = (element, event) => addListener(element, event, preventDefaultHandler);

export const addStopPropagation = (element, event) => addListener(element, event, stopPropagationHandler);

export const removePreventDefault = (element, event) => removeListener(element, event, preventDefaultHandler);

export const removeStopPropagation = (element, event) => removeListener(element, event, stopPropagationHandler);