// this script is used to initialize the game

'use strict';

import { mouseInit } from './listeners/mouse.js';
import { resizeInit } from './listeners/other.js';
import { draw } from './render.js';
import { throttle } from './utils.js';
import { pointTreeSetup } from './setup/pointTree.js';

function start() {
  mouseInit();
  resizeInit();
  pointTreeSetup();
  requestAnimationFrame(gameLoop);
}

function gameLoop() { 
  throttle(() => {
    draw();
  });
}

start();
