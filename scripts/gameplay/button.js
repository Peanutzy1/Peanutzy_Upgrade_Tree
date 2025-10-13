// this files is for the button class, since it is too big
'use strict';
import { world, ctx } from '../vars.js';
import { hexToRgba } from '../utils';

export class Button {
  constructor({
    id = '', description = '', x = 0, y = 0,
    childrenIDs = [], action = function() {},
    starter = false
  }) {
    this.id = id;
    this.description = description;

    this.x = x;
    this.y = y;
    this.w = this.tree.buttonWidth;
    this.h = this.tree.buttonHeight;
    this.fill = this.tree.buttonFill;
    this.stroke = this.tree.buttonStroke;

    this.childrenIDs = childrenIDs;

    this.action = action;
    this.starter = starter;

    this.pressed = false;
    this.hovered = false;
    this.discovered = false;
    this.unlocked = false;

    this.multiplier = 1;

    this.tree = undefined;
    this.mainCurrency = undefined;
    this.otherCurrency = undefined;

    this.rgbaValues = hexToRgba(this.fill);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 4;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  discover() {
    this.discovered = true;
  }

  unlock() {
    if (this.discovered) {
      this.unlocked = true;
    }
  }
  
  reset() {
    this.discover = false;
    this.unlocked = false;
  }

  doAction() {
    if (this.starter) {
      world.pointGain = 1;
    } else if (typeof this.action === 'function') {
      this.action();
    } else {
      this.multiplier = 1;
    }
  }

  get children() {
    return this.childrenIDs.map(id => this.tree.nodes.get(id));
  }
}
