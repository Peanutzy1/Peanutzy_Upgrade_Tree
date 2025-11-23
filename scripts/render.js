// this script is used to draw stuff in the canvas
'use strict';
import { world, ctx, screen } from './vars.js';

export const draw = () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
  ctx.scale(world.scale, world.scale);
  ctx.translate(world.x, world.y);
  screen.viewableButtons.forEach(button => button.draw());
};
