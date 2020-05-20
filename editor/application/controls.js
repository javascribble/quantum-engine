// TODO: Scaling.
// let scale = 1;
// const factor = 1.2;
// const viewport = root.querySelector('#viewport');
// viewport.addEventListener("wheel", (event) => {
//     event.preventDefault();
//     scale = Math.clamp(event.deltaY < 0 ? scale * factor : scale / factor, 0, 1);
//     viewport.style.transform = `scale(${scale})`;
//     viewport.style.transformOrigin = "50% 50% 0px";
// });

// TODO: Selection.
// const active = 'active';
// const box = document.createElement('div');
// const items = document.querySelectorAll('[selectable]');
// const zone = document.querySelector('#objects');

// const overlap = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

// const open = (event) => {
//     const style = box.style;
//     style.left = `${event.offsetX}px`;
//     style.top = `${event.offsetY}px`;
//     style.visibility = 'visible';
// };

// const draw = (event) => {
//     if (box.isOpen) {
//         const style = box.style;
//         style.width = `${style.left - event.offsetX}px`;
//         style.height = `${style.top - event.offsetY}px`;
//     }
// }

// const close = (event) => {
//     items.forEach((element) => {
//         if (overlap(box.getBoundingClientRect(), element.getBoundingClientRect())) {
//             element.classList.add(active);
//         } else {
//             element.classList.remove(active);
//         }
//     });

//     box.style.visibility = 'hidden';
// }

// addEventListener('mousedown', open);
// addEventListener('mousemove', draw);
// addEventListener('mouseup', close);