// this script is used to setup context, buttons, trees
'use strict';
import { trees } from '../vars.js';
import { Tree } from '../gameplay/tree.js';
import { Button } from '../gameplay/button.js';

// #region Point tree
export function pointTreeSetup() {
  trees.set('pointTree', new Tree({
    id: 'Point Tree',
    buttonFill: '#808080',
    buttonStroke: '#ffffff',
    buttonWidth: 160,
    buttonHeight: 100
  }));

  const pointTree = trees.get('pointTree');
  
  pointTree.addButton(
    new Button({
      id: 'p1',
      tree: pointTree,
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
