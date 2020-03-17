export const spriteComponent = 'sprite';

export function createSprite(transform, buffer, index) {
    return {
        transform,
        buffer,
        index
    };
}