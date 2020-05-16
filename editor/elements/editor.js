import { editorTemplate } from '../templates/editor.js';
import { shadow, clone } from '../utilities/elements.js';
import { syncLayout } from '../application/layout.js';
import { syncState } from '../application/state.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const template = clone(editorTemplate);
        syncLayout(template);
        syncState(template);

        const root = shadow(this);
        root.appendChild(template);

        // let scale = 1;
        // const factor = 1.2;
        // const viewport = root.querySelector('#viewport');
        // viewport.addEventListener("wheel", (event) => {
        //     event.preventDefault();
        //     scale = Math.clamp(event.deltaY < 0 ? scale * factor : scale / factor, 0, 1);
        //     viewport.style.transform = `scale(${scale})`;
        //     viewport.style.transformOrigin = "50% 50% 0px";
        // });
    }
}

customElements.define('game-editor', Editor);