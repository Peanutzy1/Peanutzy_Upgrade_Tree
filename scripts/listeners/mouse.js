// this script starts mouse logics like moving and scrolling
'use strict';
import { world, screen, canvasElement, trees } from '../vars.js';
import { screenToWorld } from '../utils.js';
export function mouseInit() {
  let leftMouseDown = false;
  let rightMouseDown = false;
  let mouseUp = false;
  let lastX = 0;
  let lastY = 0;
  let viewableButtons = buttonScanner();
  buttonHoverController(viewableButtons);
  buttonHoverController(viewableButtons, leftMouseDown, mouseUp);
  window.addEventListener('mousemove', e => {
    screen.mouse.x = e.clientX;
    screen.mouse.y = e.clientY;
    const mouseWorldCoords = screenToWorld(e.clientX, e.clientY);
    if (rightMouseDown) {
      world.x += (e.clientX - lastX) / world.scale;
      world.y += (e.clientY - lastY) / world.scale;
      lastX = e.clientX;
      lastY = e.clientY;
      viewableButtons = buttonScanner();
    }
    world.mouse.x = mouseWorldCoords.x;
    world.mouse.y = mouseWorldCoords.y;
    viewableButtons.forEach(button => { button.hovered = button.isUnderMouse(); });
  });

  window.addEventListener('mousedown', e => {
    if (e.button === 2) {
      rightMouseDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
    } else {
      leftMouseDown = true;
      viewableButtons.forEach(button => { button.pressed = button.isUnderMouse; });
    }
  });

  window.addEventListener('mouseup', () => {
    leftMouseDown = false;
    rightMouseDown = false;
    mouseUp = true;
    requestAnimationFrame(() => {
      mouseUp = false;
    });
    viewableButtons.forEach(button => {
      if(button.isInViewport && button.pressed) {
        button.onClick();
      } else {
        button.pressed = false;
      }
    });
  });

  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  canvasElement.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomFactor = 1.1;
    if (e.deltaY < 0) { 
      world.scale *= zoomFactor; 
    } else { world.scale /= zoomFactor; }            
  }, { passive: false });
}

function buttonScanner() {
  const viewableButtons = new Set();
  trees.forEach(tree => {
    tree.buttons.forEach(button => {
      if(button.isInViewport()) {
        viewableButtons.add(button);
      } else {
        button.hovered = false;
        button.pressed = false;
        button.clicked = false;
      }
    });
  });
  return viewableButtons;
}

function buttonHoverController(buttons, mouseDown, mouseUp) {
  const hoveringButtons = new Set();
  buttons.forEach(button => {
    if(button.isUnderMouse()) {
      button.hovered = true;
      button.pressed = mouseDown;
      button.clicked = mouseUp;
      hoveringButtons.add(button);
    } else { 
      button.hovered = false; 
      button.pressed = false;
    }
  });
  return hoveringButtons;
}
