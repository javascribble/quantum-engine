import { parentComponent } from '../components/parent';

export const enableGraphSystem = (options, systems, updates) => {
    const root = {};

    systems.add({
        components: [parentComponent],
        add: (entity) => {

        },
        delete: (entity) => {

        }
    });

    updates.add((deltaTime) => {

    });
};
