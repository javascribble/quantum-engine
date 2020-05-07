import { Component } from '../extensions/component.js';
import { define, shadow, clone } from '../utilities/elements.js';
import { menu } from '../templates/menu.js';

export class MenuComponent extends Component {
    constructor() {
        super();

        shadow(this).appendChild(clone(menu));
    }
}

define('menu', MenuComponent);