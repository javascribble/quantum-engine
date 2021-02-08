Quantum.Engine.plugins.add(api => {
    api.attachSystem({
        validate: entity => 'children' in entity,
        add: entity => {
            entity.children.forEach(api.attachEntity)
        }
    });
}); 