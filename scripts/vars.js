// this file contains.. variables, do you expect it to contain magic?
'use strict';
export const canvasElement = document.getElementById('gameCanvas');
export const ctx = canvasElement.getContext('2d'); 

export const screen = { 
  mouse: { x: 0, y: 0 },
  fps: 30,
  viewableButtons: new Array()
};

export const world = {
  mouse: { x: 0, y: 0 },
  x: 0,
  y: 0,
  scale: 1,
  background: 0,
};

export const trees = new Map();
