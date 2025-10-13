// this script is used to setup context, buttons, trees
'use strict';
import { trees } from '../vars.js';
import { Tree } from '../gameplay/tree.js';
import { Button } from '../gameplay/button.js';
import { currency } from '../gameplay/currency.js';

// #region Point tree
export function pointTreeSetup() {
  trees.pointTree = new Tree({
    id: 'Point Tree',
    fill: '#808080',
    stroke: '#ffffff',
    buttonWidth: 160,
    buttonHeight: 100
  });

  const pointTree = trees.pointTree;

  pointTree.addMainCurrency(
    new currency('points')
  );
  
  pointTree.addButton(
    new Button({
      id: 'p1',
      description: 'starter of all things, 1/s passive point generation',
      x: 0,
      y: 0,
      childrenIDs: [],
      action: function() { this.multiplier = 1; },
      starter: true
    })
  );
}
// #endregion
