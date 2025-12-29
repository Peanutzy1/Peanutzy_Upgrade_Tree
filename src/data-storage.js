/**
 * This file is the single source of truth
 * for the systems to run on
 * "I wonder where you get your data from" -peanut
 */

import { BUFFER_TYPE } from 'pixi.js';
import { carve } from './utils/data-storage.js';
export const pea = {
  // ========== STORAGE ==========
  MAX_ENTITIES: 10000,
  BUFFER_SIZE: 100 * 1024 * 1024,

  // ========== RENDERING ==========
  FPS: 60,

  // ========== BITS ==========

  // ========== GENERAL ==========
  GEN_IS_ACTIVE: 1 << 0,
  GEN_IS_RENDERED: 1 << 1,
  GEN_IS_DIRTY: 1 << 2,
};

export const nut = {
  // ========== STORAGE ==========
  head: 0,

  // ========== RENDERING ==========
  dt: 0,
  lastTime: 0,

  // ========== MOUSE ==========
  mouseX: 0,
  mouseY: 0,
  mouseDown: false,

  // ========== WINDOW ==========
  mouseX 
};

export const buffer = new ArrayBuffer(pea.BUFFER_SIZE);

export const zy = {
  general: carve(Uint32Array),
  special: carve(Uint32Array),
  x: carve(Float32Array),
  y: carve(Float32Array),
};