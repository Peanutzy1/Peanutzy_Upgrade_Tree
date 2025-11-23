// this script is used to initialize the game

'use strict';

import { mouseInit } from './listeners/mouse.js';
import { resizeInit } from './listeners/other.js';
import { draw } from './render.js';
import { pointTreeSetup } from './setup/pointTree.js';

function start() {
  pointTreeSetup();
  mouseInit();
  resizeInit();
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

start();
