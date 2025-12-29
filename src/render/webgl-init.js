/**
 * this file is used to initiate the webgl thingie
 * "i hate webgl" -peanutzy
 */

import vertexShaderSource from './shaders/vert-shader.vert?raw';
import fragmentShaderSource from './shader/frag-shader.frag?raw';
import {createShader, createProgram} from '../utils/render.js'

export let canvas = document.getElementById('webgl2Canvas');
export let gl = canvas.getContext('webgl2');
if (!gl) {
  throw new Error('you expected ME to RUN WEBGL 1???');
}

export function drawSimple() {
  gl.clearColor(0.5, 0.5, 0.5, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);

  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = createProgram(vertexShader, fragmentShader);
  gl.useProgram(program);

  gl.drawArrays(gl.POINTS, 0, 1);
}