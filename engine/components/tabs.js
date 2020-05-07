import { Component } from '../extensions/component.js';
import { define, shadow, clone } from '../utilities/elements.js';
import { tabs } from '../templates/tabs.js';

export class TabsComponent extends Component {
    constructor() {
        super();

        const root = shadow(this);
        root.appendChild(clone(tabs));

        this.menu = root.querySelector('slot[name="menu"]').assignedNodes()[0];

        const slot = root.querySelector('slot[name="tab"]');
        slot.addEventListener('slotchange', event => slot.assignedElements().forEach(this.addTab.bind(this)));
    }

    addTab(node) {
        const button = document.createElement('button');
        button.setAttribute('draggable', true);
        button.addEventListener('dragstart', this.dragStart);
        button.addEventListener('dragover', this.dragOver);
        button.addEventListener('drop', this.drop);
        button.innerText = node.getAttribute('name');
        this.menu.appendChild(button);
    }

    click(index) {

    }

    dragStart(event) {
        event.dataTransfer.setData("text", event.target.id)
    }

    dragOver(event) {
        event.preventDefault();
    }

    drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData("text");
        const element = document.getElementById(id);
        event.target.appendChild(element);
    }
}

define('tabs', TabsComponent);