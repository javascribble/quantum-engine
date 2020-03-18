function create(x = 0, y = 0) {
    return { x, y };
}

function distance(a, b) {
    return Math.sqrt(getDistanceSquared(a, b));
}

function distanceSquared(a, b) {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
}

function distanceSquaredNormalized(a, b, c) {
    return Math.pow(a.x - b.x, 2) / Math.pow(c.x, 2) + Math.pow(a.y - b.y, 2) / Math.pow(c.y, 2);
}

export const v2 = {
    create,
    distance,
    distanceSquared,
    distanceSquaredNormalized
};