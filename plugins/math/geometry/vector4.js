function create(x = 0, y = 0, z = 0, w = 1) {
    return {
        x,
        y,
        z,
        w,
        get r() { return this.x; },
        set r(value) { this.x = value; },
        get g() { return this.y; },
        set g(value) { this.y = value; },
        get b() { return this.z; },
        set b(value) { this.z = value; },
        get a() { return this.w; },
        set a(value) { this.w = value; },
    };
}

export const v4 = {
    create
};