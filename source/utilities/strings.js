export function splitNewLines(string) {
    return string.split('\n');
}

export function removeNewLines(string) {
    return string.replace(/\n/g, '');
};

export function firstSubstring(string, index) {
    return string.substring(0, index);
};