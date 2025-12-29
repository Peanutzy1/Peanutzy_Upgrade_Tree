/**
 * this file contains helper funcs for webgl shit
 * "at peanutTec we do not fucking store init code and helper fns together" -peanut
 */

import { gl, canvas } from '../render/webgl-init.js';

/**
 * Compiles a GLSL shader from source string.
 * @param {number} type - The shader type: gl.VERTEX_SHADER or gl.FRAGMENT_SHADER.
 * @param {string} source - The raw GLSL source code (use ?raw import).
 * @returns {WebGLShader | undefined} The compiled shader or undefined if it failed.
 */

export function createShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

/**
 * Links a vertex and fragment shader into a single GPU Program.
 * @param {WebGLShader} vertexShader - The compiled vertex shader.
 * @param {WebGLShader} fragmentShader - The compiled fragment shader.
 * @returns {WebGLProgram | undefined} The linked program or undefined if it failed.
 */

export function createProgram(vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

