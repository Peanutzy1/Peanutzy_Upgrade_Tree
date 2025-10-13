// this script includes other listeners
'use strict';
import { canvasElement } from '../vars.js';

const resizeCanvas = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvasElement.style.width = `${width}px`;
  canvasElement.canvas.style.height = `${height}px`;
  canvasElement.canvas.width = width;
  canvasElement.canvas.height = height;
};

export const resizeInit = () => {
  resizeCanvas();
  addEventListener('resize', () => {
    resizeCanvas();
  });
};
