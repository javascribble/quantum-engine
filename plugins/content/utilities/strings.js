export function isValidLine(line) {
    return line && /\S/.test(line) && !line.startsWith('#');
}