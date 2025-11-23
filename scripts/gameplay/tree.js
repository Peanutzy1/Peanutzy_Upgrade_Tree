// this script include the tree class
'use strict';

export class Tree {
  constructor({ id, buttonFill, buttonStroke, buttonWidth, buttonHeight }) {
    this.id = id;
    this.buttons = new Map();
    this.links = new Map();
    this.buttonFill = buttonFill;
    this.buttonStroke = buttonStroke;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
  }

  draw() {
    this.buttons.forEach(button => {
      if(button.unlocked) {
        button.draw();
      }
    });
    this.links.forEach(e => e.draw());
  }
}
