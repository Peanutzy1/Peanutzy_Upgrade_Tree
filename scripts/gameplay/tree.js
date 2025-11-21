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

  addButton(button) {
    button.tree = this;
    button.mainCurrency = this.mainCurrency;
    button.otherCurrencies = this.otherCurrencies;
    this.buttons.set(button.id, button);
  }

  addMainCurrency(currency) {
    this.mainCurrency = currency;
  }

  addOtherCurrencies(currency) {
    this.otherCurrencies.set(currency.id, currency);
  } 

  addLink(link) {
    this.links.set(link.id, link);
  }

  draw() {
    this.nodes.forEach(e => e.draw());
    this.links.forEach(e => e.draw());
  }
}
