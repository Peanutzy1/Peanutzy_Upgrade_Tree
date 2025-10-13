// this script starts mouse logics like moving and scrolling
'use strict';
import { world, screen, canvasElement } from '../vars.js';
import { screenToWorld, throttle } from '../utils.js';

export const mouseInit = () => {
  let mousePressed = false;
  let lastX = 0;
  let lastY = 0;
  window.addEventListener('mousemove', throttle(e => {
    screen.mouse.x = e.offsetX;
    screen.mouse.y = e.offsetY;
    const mouseWorldCoords = screenToWorld(e.offsetX, e.offsetY);
    world.mouse.x = mouseWorldCoords.x;
    world.mouse.y = mouseWorldCoords.y;
    if (mousePressed) {
      world.x += (e.clientX - lastX) / world.scale;
      world.y += (e.clientY - lastY) / world.scale;
      lastX = e.offsetX;
      lastY = e.offsetY;
    }
  }, 33));

  window.addEventListener('mousedown', e => {
    mousePressed = true;
    lastX = e.clientX;
    lastY = e.clientY;
    // TODO: initialize button searching
  });

  window.addEventListener('mouseup', () => {
    mousePressed = false;
  });

  canvasElement.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomFactor = 1.1;
    if (e.deltaY < 0) { 
      world.scale *= zoomFactor; 
    } else { world.scale /= zoomFactor; }            
  }, { passive: false });
};
