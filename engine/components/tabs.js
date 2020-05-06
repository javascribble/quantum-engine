import { Component } from '../extensions/component.js';
import { define } from '../utilities/elements.js';
import { tabs } from '../templates/tabs.js';

export default class TabsComponent extends Component {
    constructor() {
        super(tabs);
    }

    activate(index) {

    }
}

define('tabs', TabsComponent);