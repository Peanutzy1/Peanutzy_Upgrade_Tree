/**
 * this file contains the helpers for
 * the data storage
 * "at peanutTec, we store helpers seperately" -peanut
 */

import { pea, nut, zy } from '../data-storage.js';

/**
 * @param {
 * Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor |
 * Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor |
 * Float32ArrayConstructor | Float64ArrayConstructor} Type - the type of the constructor for typed arrays (like Uint32Array not new Uint32Array())
 *
 * @returns {
 * Int8Array | Uint8Array | Uint8ClampedArray | Int16Array
 * | Uint16Array | Int32Array | Uint32Array | Float32Array
 * | Float64Array | BigInt64Array | BigUint64Array} - the instance, like new Uint32Array()
 * 
 * "sorry for the big union types idk why it doesnt work if u do @typedef" -peanutzy (yes the developer not the persona)
 */

export function carve(Type) {
  const buffer = nut.buffer;
  const entities = pea.maxEntities;
  const bPE = Type.BYTES_PER_ENTITY;

  const start = (nut.head + bPE - 1) & ~(bPE - 1);

  nut.head = start + bPE * entities; // the start plus array length in bytes

  if (nut.head > buffer.byteLength) {
    throw new Error('INCREASE YOUR pea.buffer size!!!');
  }

  return new Type(buffer, start, entities);
}

/**
 * @param {number} id - The entity index.
 * @param {Object} config - The data to "bake" into the arrays.
 * * @important UNDER NO CIRCUMSTANCES RUN THIS IN GAMELOOP OR PARTS OF IT
 * This function creates garbage and uses slow reflection (for...in).
 * Use only for initialization/spawn.
 * "no use dis in loopi!!!" -peanut
 */

export function sculpt(id, config) {
  const arrays = zy;

  for (const key in config) {
    arrays[key][id] = config[key];
  }
}
