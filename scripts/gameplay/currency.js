// this script is used to track points
'use strict';

export class currency {
  constructor(id) {
    this.id = id;
    this.amount = 0;
    this.passiveGeneration = false;
  }

  add(n) { this.amount += n; }
  subtract(n) { this.amount -= n ; }
  set(n) { this.amount = n; }
}
