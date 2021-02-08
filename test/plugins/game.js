export const enableGamePlugin = (api, engine) => {
    api.attachSystem({
        validate: entity => 'children' in entity,
        add: entity => {
            entity.children.forEach(api.attachEntity);

            engine.querySelector('button').addEventListener('click', event => {
                const player = entity.children[1];
                api.detachEntity(player);
                api.attachEntity(player);
            });
        }
    });
};