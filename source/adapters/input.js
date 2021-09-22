export class InputAdapter extends Set {
    get bridge() {
        return {
            getState: this.getState.bind(this)
        };
    }

    load(data) {
        const { controls, devices } = data;
        for (const [deviceName, controlMap] of Object.entries(devices)) {
            for (const input of this) {
                const device = input.devices[deviceName];
                if (device) {
                    for (const [name, control] of Object.entries(controlMap)) {
                        input.controls[device[name]] = controls[control];
                    }
                }
            }
        }
    }

    unload() {

    }

    getState(control) {
        for (const input of this) {
            const state = input.state[control];
            if (state) {
                return state;
            }
        }
    }
}