export class SelectEvent extends CustomEvent {
    constructor(event) {
        super('select', { detail: event });
    }
}