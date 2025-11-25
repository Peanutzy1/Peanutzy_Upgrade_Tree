// this file is for the button class
// "who would've thought button behavior is complicated af" - peanut

'use strict';
import { ctx, world, screen } from '../vars.js';
import { hexToRgba, isRectInViewport, isPointInRect } from '../utils.js';

export class Button {
  constructor({
    id = '', description = '', x = 0, y = 0, // coords is centered
    action = () => { console.log(`${this.id} did action`); }, // action for onclick() method
    activateReq = () => { return true; }, // activation requirements, returns boolean
    unlockReq = () => { return true; }, // visibility requirements, returns boolean
    //  "for the suprise element xdd" - peanut
    childrenIDs = [], // IDs of buttons attempting unlocking after activation
    tree
  }) {
    // self explanatory
    this.id = id;
    this.description = description;
    this.tree = tree;
    this.x = x;
    this.y = y;

    // the button inherits these traits from the tree
    this.w = this.tree?.buttonWidth ?? 160;
    this.h = this.tree?.buttonHeight ?? 100;
    this.fill = this.tree?.buttonFill ?? '#0080ff';
    this.stroke = this.tree?.buttonStroke ?? '#8000ff';

    // current states of the button
    this.pressed = false;
    this.hovered = false;
    this.unlocked = unlockReq();
    this.activationCount = 0; // activation count instead of activated because its more versatile

    this.activateReq = activateReq;
    this.unlockReq = unlockReq;
    this.action = action;

    this.childrenIDs = childrenIDs;

    // this is r, g, b, a values (stored as an object) for stoke color and fill color
    this.rgbaFill = hexToRgba(this.fill);
    this.rgbaStroke = hexToRgba(this.stroke);
    this.tree.buttons.set(this.id, this); // button auto adds itself on the tree's buttons Map
  }
  // "Players would complain if the game's a blank canvas with invisible buttons lol" - peanut
  draw() {
    ctx.beginPath();
    // so this fill darkens based on the states
    // like darker when hovered and EVEN DARKER when its pressed on
    if(this.pressed) {
      ctx.fillStyle = `rgba(
      ${this.rgbaFill.r * 0.5}, 
      ${this.rgbaFill.g * 0.5}, 
      ${this.rgbaFill.b * 0.5},
      ${this.rgbaFill.a}
      )`;
    } else if(this.hovered) {
      ctx.fillStyle = `rgba(
      ${this.rgbaFill.r * 0.75}, 
      ${this.rgbaFill.g * 0.75}, 
      ${this.rgbaFill.b * 0.75},
      ${this.rgbaFill.a}
      )`;
    } else {
      ctx.fillStyle = this.fill;
    }

    // the stroke darkens when its not upgraded yet, and shines the true color when it does
    if(this.activationCount === 0) {
      ctx.strokeStyle = `rgba(
      ${this.rgbaStroke.r * 0.25}, 
      ${this.rgbaStroke.g * 0.25}, 
      ${this.rgbaStroke.b * 0.25},
      ${this.rgbaStroke.a}
      )`;
    } else {
      ctx.strokeStyle = this.stroke;
    }
    ctx.lineWidth = 4;
    // you can see the button's coords are centered 
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.beginPath();
  }

  // ok this thing works
  isInViewport() {
    return isRectInViewport({ x: this.x, y: this.y, w: this.w, h: this.h, pad: 50 });
  }

  // "ah yes reactive buttons" - peanut
  isUnderMouse() {
    return isPointInRect({ 
      px: world.mouse.x, py: world.mouse.y,
      x: this.x, y: this.y, w: this.w, h: this.h 
    });
  }

  // "no sad button cant clicky clicky here (except for trolls)" - peanut
  onClick() {
    if(this.action && this.activateReq()) {
      this.activationCount++;
      this.action();
      this.unlockController();
    }
    this.pressed = false;
  }

  // unlock other button with matching ID inside this.childrenIDs
  // if their unlockReq() returns true
  // will be visible if theirisInViewport() also returns true 
  unlockController() {
    for (const i in this.childrenIDs) {
      const button = this.tree.buttons.get(this.childrenIDs[i]);
      if(button) {
        button.unlocked = button.unlockReq();
        if(button.isInViewport()) {
          screen.viewableButtons.add(button);
        }
      }
    }
  }
} // "the {} slide of doom, never nesters hates this" - peanut
