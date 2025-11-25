// this file contains.. variables, do you expect it to contain magic?
// without these your game would have dementia trying to remember
'use strict';
export const canvasElement = document.getElementById('gameCanvas'); 
export const ctx = canvasElement.getContext('2d'); 

export const screen = { 
  mouse: { x: 0, y: 0 },
  fps: 30,
  viewableButtons: new Set(), // buttons inside viewport / canvas
  deltaTime: 0,
};

export const world = {
  mouse: { x: 0, y: 0 },
  x: 0, y: 0, // viewport position
  scale: 1, // scale closer to 0 = bigger fov
  background: 0,
};

export const trees = new Map();

export const keyStates = {}; // stores key is pressed or not
