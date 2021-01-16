export class EventSet extends Set {
    invoke(value) {
        for (const event of this) {
            event(value);
        }
    }
}

export class ObservableSet extends Set {
    add(value) {
        this.onAdd?.(value);
        super.add(value);
    }

    delete(value) {
        this.onDelete?.(value);
        super.delete(value);
    }
}