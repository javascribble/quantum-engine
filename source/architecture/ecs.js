import { Mobius } from '../collections/mobius.js';

export const initializeECS = (flag = 'update') => {
    const entitySystems = new Map();
    const systemEntities = new Map();
    return {
        entities: new Mobius(entitySystems, systemEntities),
        systems: new Mobius(systemEntities, entitySystems),
        update: time => {
            for (const [entity, systems] of entitySystems) {
                if (entity[flag]) {
                    for (const [system, entities] of systemEntities) {
                        const valid = system.validate(entity);
                        const exists = entities.includes(entity);
                        if (valid && !exists) {
                            systems.add(system);
                            entities.add(entity);
                        } else if (!valid && exists) {
                            systems.delete(system);
                            entities.delete(entity);
                        }
                    }

                    entity[flag] = false;
                }
            }

            for (const [system, entities] of systemEntities) {
                system.update?.(entities, time);
            }
        }
    };
};