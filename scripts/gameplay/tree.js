// this script include the tree class
// "ah yes a tree... class" - peanut
'use strict';

import { trees } from '../vars.js';

export class Tree {
  constructor({ id, buttonFill, buttonStroke, buttonWidth, buttonHeight }) {
    this.id = id; // tree's id 
    this.buttons = new Map();
    this.links = new Map();

    this.buttonFill = buttonFill; // defines the fill color of the button in tree
    this.buttonStroke = buttonStroke; // ... stroke color
    this.buttonWidth = buttonWidth; // ... button width
    this.buttonHeight = buttonHeight; // ... button height

    trees.set(this.id, this); // auto add to trees, a map in ../vars.js
  }

  // loops over all button and links and then run their draw function if they are unlocked
  draw() {
    this.buttons.forEach(button => {
      if(button.unlocked) {
        button.draw();
      }
    });
    this.links.forEach(e => e.draw());
  }
}
