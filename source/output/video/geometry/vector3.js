export function createVector3(x = 0, y = 0, z = 0) {
    return { x, y, z };
}

export function getVector3Sum(a, b, c) {
    c.x = a.x + b.x;
    c.y = a.y + b.y;
    c.z = a.z + b.z;
}

export function getVector3Difference(a, b, c) {
    c.x = a.x - b.x;
    c.y = a.y - b.y;
    c.z = a.z - b.z;
}

export function getVector3Product(a, b, c) {
    c.x = a.x * b.x;
    c.y = a.y * b.y;
    c.z = a.z * b.z;
}

export function getVector3Quotient(a, b, c) {
    c.x = a.x / b.x;
    c.y = a.y / b.y;
    c.z = a.z / b.z;
}

export function getVector3CrossProduct(a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
}

export function getVector3DotProduct(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function getVector3Distance(a, b) {
    return Math.sqrt(getVector3DistanceSquared(a, b));
}

export function getVector3DistanceSquared(a, b) {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
}