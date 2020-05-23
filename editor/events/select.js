export class SelectEvent extends CustomEvent {
    constructor() {

        super('select', { detail: {} });
    }
}