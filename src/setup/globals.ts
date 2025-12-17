// this file is for globals of the manager like the mouse, window or stuff

import { manager } from "./managerInit";

manager.addEntity('mouse')

manager.addComponents('mouse' ,{
  // these positions cuz mouse initially outside of +
  pos_x: Infinity,
  pos_y: Infinity
})