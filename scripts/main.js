// this script is used to initialize the game

'use strict';

import { mouseInit } from './listeners/mouse.js';
import { resizeInit } from './listeners/other.js';
import { keyboardController, keyboardInit } from './listeners/keyboard.js';
import { draw } from './render.js';
import { pointTreeSetup } from './setup/pointTree.js';
import { screen } from './vars.js';

function start() {
  pointTreeSetup();
  mouseInit();
  resizeInit();
  keyboardInit();
  requestAnimationFrame(gameLoop);
}

let lastTime = 0;
function gameLoop(currentTime) {
  keyboardController();
  screen.deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  draw();
  requestAnimationFrame(gameLoop);
}

start();
