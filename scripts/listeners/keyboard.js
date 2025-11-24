// this file contains keyboard listeners and idk how to say it... keymaps? thats it

'use strict';

import { keyStates, world, screen } from '../vars.js';
import { buttonScanner } from '../utils.js';

export function keyboardInit() {
  window.addEventListener('keydown', key => {
    keyStates[key.key] = true;
  });
  window.addEventListener('keyup', key => {
    keyStates[key.key] = false;
  });
}

export function keyboardController() {
  let movementSpeed = 3;
  if(keyStates[' ']) { movementSpeed *= 2; }
  const actualSpeed = movementSpeed / world.scale * screen.deltaTime * 60;
  if(keyStates['a']) { world.x += actualSpeed; }
  if(keyStates['d']) { world.x -= actualSpeed; }
  if(keyStates['w']) { world.y += actualSpeed; }
  if(keyStates['s']) { world.y -= actualSpeed; }
  if(
    keyStates['w'] ||
    keyStates['a'] ||
    keyStates['s'] ||
    keyStates['d']
  ) { buttonScanner(); }
}
