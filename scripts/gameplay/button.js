// this files is for the button class, since it is too big
'use strict';
import { ctx, world } from '../vars.js';
import { hexToRgba, isRectInViewport, isPointInRect, scaleRGB } from '../utils';

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
    this.unlocked = false;

    this.tree = undefined;

    this.rgbaValues = hexToRgba(this.fill);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    if(this.hovered) {
      const hoveredFill = scaleRGB({ 
        r: this.rgbaValues.r,
        g: this.rgbaValues.g,
        b: this.rgbaValues.b,
        scale: 0.75
      });
      ctx.fillstyle = `rgba(${hoveredFill.r}, ${hoveredFill.g}, ${hoveredFill.b})`;
    }
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 4;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  isInViewPort() {
    return isRectInViewport({ x: this.x, y: this.y, w: this.w, h: this.h, pad: 50 });
  }

  isUnderMouse() {
    return isPointInRect({ 
      px: world.mouse.x, py: world.mouse.y,
      x: this.x, y: this.y, w: this.w, h: this.h 
    });
  }

  unlock() {
    this.unlocked = true;
  }
  
  reset() {
    this.unlocked = false;
  }

  get children() {
    return this.childrenIDs.map(id => this.tree.buttons.get(id));
  }
}
