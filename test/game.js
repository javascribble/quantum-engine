export class Game extends HTMLElement {
    async integrate(api) {
        const { options, broker, animations, loadResource, drawSprite } = api;
        const { sprites } = options;

        const sprite = { ...sprites[0], image: await loadResource(0) };
        broker.subscribe('MoveUp', _ => sprite.dy -= 10);
        broker.subscribe('MoveDown', _ => sprite.dy += 10);
        broker.subscribe('MoveLeft', _ => sprite.dx -= 10);
        broker.subscribe('MoveRight', _ => sprite.dx += 10);
        animations.push((deltaTime, elapsed) => drawSprite(sprite));
    }
}

quantum.define('quantum-game', Game);