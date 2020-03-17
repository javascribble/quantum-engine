export const renderableComponent = 'renderable';

export function createRenderable(transform, buffer, index) {
    return {
        transform,
        buffer,
        index
    };
}