/**
 * this file manages mouse pos and mouse states. thats it. nothing else.
 */

import { nut } from '../data-storage.js';

function initMouse() {
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();

    nut.mouseX = e.clientX - rect.left;
    nut.mouseY = e.clientY - rect.top;
  });

  window.addEventListener('mousedown', () => {
    nut.mouseDown = true;
  });

  window.addEventListener('mouseup', () => {
    nut.mouseDown = false;
  });
}
