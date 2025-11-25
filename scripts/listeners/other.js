// this script includes other listeners
// "BORING" - peanut

'use strict';
import { canvasElement } from '../vars.js';

function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // resizes canvas and also style so it doesnt scale canvas
  canvasElement.style.width = `${width}px`;
  canvasElement.style.height = `${height}px`;
  canvasElement.width = width;
  canvasElement.height = height;
}

export function resizeInit() {
  resizeCanvas();
  addEventListener('resize', () => {
    resizeCanvas();
  });
}
