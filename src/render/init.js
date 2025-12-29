import { resizeMainCanvas } from '../utils/render.js'
import { canvas, gl, drawSimple } from './webgl-init.js'

export function renderInit() {
  resizeMainCanvas(canvas, gl);
  drawSimple();
  window.addEventListener('resize', () => {
    resizeMainCanvas();
    drawSimple();
  });
}