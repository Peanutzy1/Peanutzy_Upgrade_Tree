// this script starts mouse logics like moving and scrolling
'use strict';
import { world, screen, canvasElement } from '../vars.js';
import { screenToWorld, throttle } from '../utils.js';
export const mouseInit = () => {
  let mouseDown = false;
  let lastX = 0;
  let lastY = 0;
  let viewableButtons = buttonScanner();
  window.addEventListener('mousemove', throttle(e => {
    screen.mouse.x = e.offsetX;
    screen.mouse.y = e.offsetY;
    const mouseWorldCoords = screenToWorld(e.offsetX, e.offsetY);
    if (mouseDown) {
      world.x += (e.clientX - lastX) / world.scale;
      world.y += (e.clientY - lastY) / world.scale;
      lastX = e.offsetX;
      lastY = e.offsetY;
      viewableButtons = buttonScanner();
    }
    world.mouse.x = mouseWorldCoords.x;
    world.mouse.y = mouseWorldCoords.y;
    buttonHoverController(viewableButtons);
  }, 33));

  window.addEventListener('mousedown', e => {
    mouseDown = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  window.addEventListener('mouseup', () => {
    mouseDown = false;
  });

  canvasElement.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomFactor = 1.1;
    if (e.deltaY < 0) { 
      world.scale *= zoomFactor; 
    } else { world.scale /= zoomFactor; }            
  }, { passive: false });
};

function buttonScanner() {
  const viewableButtons = [];
  world.trees.forEach(tree => {
    tree.buttons.forEach(button => {
      if(button.isInViewport()) {
        viewableButtons.push(button);
      }
    });
  });
  return viewableButtons;
}

function buttonHoverController(buttons) {
  buttons.forEach(button => {
    if(button.isUnderMouse()) {
      button.hovered = true;
    } else { button.hovered = false; }
  });
}
