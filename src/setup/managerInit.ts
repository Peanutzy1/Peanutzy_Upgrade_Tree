// this file is for some globals that is totally not the elements
import { MacademiaManager, HazelnutHook, ChestnutContainer, makeContainer, ContainerSchema } from '../core/core';

export const containerSchema = {
  pos_x: makeContainer<number>,
  pos_y: makeContainer<number>,
} satisfies ContainerSchema

export const manager = new MacademiaManager(containerSchema);