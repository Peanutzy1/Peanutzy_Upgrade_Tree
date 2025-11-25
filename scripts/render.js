// this script is used to draw stuff in the canvas
// "if this doesnt exist you'd be second guessing where the button is" - peanut

'use strict';
import { world, ctx, screen } from './vars.js';

export const draw = () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // resets zoom / pan
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.translate(window.innerWidth / 2, window.innerHeight / 2); // center the canvas
  ctx.scale(world.scale, world.scale);
  ctx.translate(-world.x, -world.y); // i want world.x and world.y to be canvas pos not offsets
  screen.viewableButtons.forEach(button => button.draw()); // draw EVERYTHING!!!!
};
