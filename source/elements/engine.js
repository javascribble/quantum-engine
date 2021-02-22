import { Entity } from '../architecture/entity.js';
import { Component } from '../architecture/component.js';
import { System } from '../architecture/system.js';
import html from '../templates/engine.js';

const { animate, loadJson } = quantum;

export class Engine extends Quantum {
    plugins = [];

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        loadJson(currentValue).then(this.load.bind(this));
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) this[addedElement.id] = addedElement;
        for (const deletedElement of deletedElements) delete this[deletedElement.id];
    }

    async load(options) {
        if (this.animation) {
            this.animation.cancel();
        }

        await initializeAPI(options)
        const state = { entities: [], components: [], systems: [] };
        for (const plugin of this.plugins) await plugin(this, state, options);

        this.animation = animate(time => {
            for (const system of systems) system.update(time);
            return this.isConnected;
        });
    }
}

Object.assign(Engine, { Entity, Component, System });

Engine.define('quantum-engine', html);