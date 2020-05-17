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

// function Selectables() {
//     this.foreach = function (items, callback, scope) {
//         if (Object.prototype.toString.call(items) === '[object Object]') {
//             for (var prop in items) {
//                 if (Object.prototype.hasOwnProperty.call(items, prop)) {
//                     callback.call(scope, items[prop], prop, items);
//                 }
//             }
//         } else {
//             for (var i = 0, len = items.length; i < len; i++) {
//                 callback.call(scope, items[i], i, items);
//             }
//         }
//     }

//     this.options = {
//         zone: "#wrapper", // ID of the element whith selectables.          
//         selectedClass: 'active', // class name to apply to seleted items      
//         key: false, //'altKey,ctrlKey,metaKey,false  // activate using optional key     
//         moreUsing: 'shiftKey', //altKey,ctrlKey,metaKey   // add more to selection
//         onSelect: null, // event fired on every item when selected.               
//         onDeselect: null // event fired on every item when selected.
//     };

//     var self = this;
//     this.enable = function () {
//         this.zone = document.querySelector(this.options.zone);
//         this.items = document.querySelectorAll('[selectable]');
//         this.disable();
//         this.zone.addEventListener('mousedown', self.rectOpen);
//         return this;
//     };
//     this.disable = function () {
//         this.zone.removeEventListener('mousedown', self.rectOpen);
//         return this;
//     };
//     var offset = function (el) {
//         var r = el.getBoundingClientRect();
//         return { top: r.top + document.body.scrollTop, left: r.left + document.body.scrollLeft }
//     };
//     this.suspend = function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//     }
//     this.rectOpen = function (e) {
//         if (self.options.key && !e[self.options.key]) {
//             return;
//         }
//         self.foreach(self.items, function (el) {
//             el.addEventListener('click', self.suspend, true); //skip any clicks
//             if (!e[self.options.moreUsing]) {
//                 el.classList.remove(self.options.selectedClass);
//             }
//         });
//         self.ipos = [e.pageX, e.pageY];
//         if (!rb()) {
//             var gh = document.createElement('div');
//             gh.id = 's-rectBox';
//             gh.style.left = e.pageX + 'px';
//             gh.style.top = e.pageY + 'px';
//             document.body.appendChild(gh);
//         }
//         document.body.addEventListener('mousemove', self.rectDraw);
//         window.addEventListener('mouseup', self.select);
//     };
//     var rb = function () {
//         return document.getElementById('s-rectBox');
//     };
//     var cross = function (a, b) {
//         var aTop = offset(a).top, aLeft = offset(a).left, bTop = offset(b).top, bLeft = offset(b).left;
//         return !(((aTop + a.offsetHeight) < (bTop)) || (aTop > (bTop + b.offsetHeight)) || ((aLeft + a.offsetWidth) < bLeft) || (aLeft > (bLeft + b.offsetWidth)));
//     };
//     this.select = function (e) {
//         var a = rb();
//         if (!a) {
//             return;
//         }
//         delete (self.ipos);
//         document.body.classList.remove('s-noselect');
//         document.body.removeEventListener('mousemove', self.rectDraw);
//         window.removeEventListener('mouseup', self.select);
//         var s = self.options.selectedClass;
//         self.foreach(self.items, function (el) {
//             if (cross(a, el) === true) {
//                 if (el.classList.contains(s)) {
//                     el.classList.remove(s);
//                     self.options.onDeselect(el);
//                 } else {
//                     el.classList.add(s);
//                     self.options.onSelect(el);
//                 }
//             }
//             setTimeout(function () {
//                 el.removeEventListener('click', self.suspend, true);
//             }, 100);
//         });
//         a.parentNode.removeChild(a);
//     }
//     this.rectDraw = function (e) {
//         var g = rb();
//         if (!self.ipos || g === null) {
//             return;
//         }
//         var tmp, x1 = self.ipos[0], y1 = self.ipos[1], x2 = e.pageX, y2 = e.pageY;
//         if (x1 > x2) {
//             tmp = x2, x2 = x1, x1 = tmp;
//         }
//         if (y1 > y2) {
//             tmp = y2, y2 = y1, y1 = tmp;
//         }
//         g.style.left = x1 + 'px', g.style.top = y1 + 'px', g.style.width = (x2 - x1) + 'px', g.style.height = (y2 - y1) + 'px';
//     }
//     this.options.selectables = this;
// }