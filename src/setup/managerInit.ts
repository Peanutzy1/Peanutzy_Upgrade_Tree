// this file is for some globals that is totally not the elements
import { MacademiaManager, HazelnutHook, ChestnutContainer, makeContainer, ContainerSchema } from '../core/core';

export const containerSchema = {
  positions: makeContainer<{x: number, y: number}> 
} satisfies ContainerSchema

export const manager = new MacademiaManager(containerSchema);
manager.addEntity('mouse');
manager.addComponents('mouse', {
  positions: {x: 0, y: 0}
})