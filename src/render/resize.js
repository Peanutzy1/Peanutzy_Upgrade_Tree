/**
 * this file is for
 * RESIZER!!
 */

import { drawSimple } from './webgl-init.js';

export function resizeInit() {
  window.addEventListener('resize', () => {
    resizeMainCanvas();
    drawSimple();
  });
}

function resizeMainCanvas() {
  const dpr = window.devicePixelRatio || 1;

  const w = window.innerWidth;
  const h = window.innerHeight;

  const pw = Math.floor(w * dpr);
  const ph = Math.floor(h * dpr);

  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
    gl.viewport(0, 0, pw, ph);
  }

  console.log(`synced to ${pw}, ${ph}`);
}