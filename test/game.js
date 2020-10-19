export class Game extends HTMLElement {
    async integrate(api) {
        const { options, broker, loadResource, drawSprite } = api;
        const { sprites } = options;

        const sprite = { ...sprites[0], image: await loadResource(0) };
        broker.subscribe('MoveUp', _ => sprite.dy -= 10);
        broker.subscribe('MoveDown', _ => sprite.dy += 10);
        broker.subscribe('MoveLeft', _ => sprite.dx -= 10);
        broker.subscribe('MoveRight', _ => sprite.dx += 10);
        quantum.animate((deltaTime, elapsed) => {
            drawSprite(sprite);
            return true;
        });
    }
}

quantum.define('quantum-game', Game);