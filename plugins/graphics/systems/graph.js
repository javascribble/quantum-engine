import { updates, systems } from '../../../engine/main';
import { parentComponent } from '../components/parent';

const defaultGraphOptions = {
};

export const enableGraphSystem = (graphOptions) => {
    const options = {
        ...defaultGraphOptions,
        ...graphOptions
    };

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
