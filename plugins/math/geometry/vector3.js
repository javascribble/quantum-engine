function create(x = 0, y = 0, z = 0) {
    return { x, y, z };
}

function add(a, b, c) {
    c.x = a.x + b.x;
    c.y = a.y + b.y;
    c.z = a.z + b.z;
}

function subtract(a, b, c) {
    c.x = a.x - b.x;
    c.y = a.y - b.y;
    c.z = a.z - b.z;
}

function multiply(a, b, c) {
    c.x = a.x * b.x;
    c.y = a.y * b.y;
    c.z = a.z * b.z;
}

function divide(a, b, c) {
    c.x = a.x / b.x;
    c.y = a.y / b.y;
    c.z = a.z / b.z;
}

function crossProduct(a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
}

function dotProduct(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

function distance(a, b) {
    return Math.sqrt(distanceSquared(a, b));
}

function distanceSquared(a, b) {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
}

export const v3 = {
    create,
    add,
    subtract,
    multiply,
    divide,
    crossProduct,
    dotProduct,
    distance,
    distanceSquared
};