/**
 * this file contains the renderer from pixi.js
 * "industry standard for bla bla" -gemini (stop glazing bruh)
 */

import { Application } from "pixi.js";

const app = new Application();

(async () => {
    await app.init({
        resizeTo: window,
        background: 0x808080
    })

    document.body.appendChild(app.canvas)
})()