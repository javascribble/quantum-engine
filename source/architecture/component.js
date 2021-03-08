export const bindComponents = (entity, system) => {
    system.entities.push(entity);
    entity.systems.push(system);
    system.construct?.(entity);
};

export const unbindComponents = (entity, system) => {
    system.entities.remove(entity);
    entity.systems.remove(system);
    system.destruct?.(entity);
};
