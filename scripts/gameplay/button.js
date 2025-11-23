// this files is for the button class, since it is too big
'use strict';
import { ctx, world, screen } from '../vars.js';
import { hexToRgba, isRectInViewport, isPointInRect } from '../utils.js';

export class Button {
  constructor({
    id = '', description = '', x = 0, y = 0,
    action = () => { console.log(`${this.id} did action`); },
    activateReq = () => { return true; },
    unlockReq = () => { return true; },
    childrenIDs = [],
    tree
  }) {
    this.id = id;
    this.description = description;
    this.tree = tree;
    this.x = x;
    this.y = y;
    this.w = this.tree?.buttonWidth ?? 160;
    this.h = this.tree?.buttonHeight ?? 100;
    this.fill = this.tree?.buttonFill ?? '#0080ff';
    this.stroke = this.tree?.buttonStroke ?? '#8000ff';

    this.pressed = false;
    this.hovered = false;
    this.unlocked = unlockReq();
    this.activationCount = 0;

    this.activateReq = activateReq;
    this.unlockReq = unlockReq;
    this.action = action;

    this.childrenIDs = childrenIDs;

    this.rgbaValues = hexToRgba(this.fill);

    this.tree.buttons.set(this.id, this);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    if(this.pressed) {
      ctx.fillStyle = `rgba(
      ${this.rgbaValues.r * 0.5}, 
      ${this.rgbaValues.g * 0.5}, 
      ${this.rgbaValues.b * 0.5},
      ${this.rgbaValues.a}
      )`;
    } else if (this.hovered) {
      ctx.fillStyle = `rgba(
      ${this.rgbaValues.r * 0.75}, 
      ${this.rgbaValues.g * 0.75}, 
      ${this.rgbaValues.b * 0.75},
      ${this.rgbaValues.a}
      )`;
    } else {
      ctx.fillStyle = this.fill;
    }
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 4;
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.beginPath();
  }

  isInViewport() {
    return isRectInViewport({ x: this.x, y: this.y, w: this.w, h: this.h, pad: 50 });
  }

  isUnderMouse() {
    return isPointInRect({ 
      px: world.mouse.x, py: world.mouse.y,
      x: this.x, y: this.y, w: this.w, h: this.h 
    });
  }

  onClick() {
    if(this.action && this.activateReq()) {
      this.activationCount++;
      this.action();
      this.unlockController();
    }
    this.pressed = false;
  }

  unlockController() {
    for (const i in this.childrenIDs) {
      const button = this.tree.buttons.get(this.childrenIDs[i]);
      if(button) {
        button.unlocked = button.unlockReq();
        if(button.unlockReq() && button.isInViewport()) {
          screen.viewableButtons.add(button);
        }
      }
    }
  }
}
