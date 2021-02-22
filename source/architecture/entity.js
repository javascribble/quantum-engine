export class Entity {
    components = [];
    systems = [];

    delete() {

    }
}

        // attachEntity: entity => {
        //     entity.systems = [];
        //     for (const system of systems) {
        //         if (system.validate(entity)) {
        //             system.entities.push(entity);
        //             entity.systems.push(system);
        //         }
        //     }
        // },
        // detatchEntity: entity => {
        //     for (const system of entity.systems) {
        //         system.entities.remove(entity);
        //     }

        //     delete entity.systems;
        // },
        // updateEntity: entity => {
        //     const systems = entitySystems.get(entity);
        //     for (const [system, entities] of systemEntities) {
        //         const valid = system.validate(entity);
        //         const exists = entities.has(entity);
        //         if (valid && !exists) {
        //             system.add?.(entity);
        //             entities.push(entity);
        //             systems.push(system);
        //         } else if (!valid && exists) {
        //             system.remove?.(entity);
        //             entities.remove(entity);
        //             systems.remove(system);
        //         }
        //     }
        // }