export { MacademiaManager } from './MacademiaManager';
export { HazelnutHook } from './HazelnutHook';
export type {
  EntityID,
  CullFn,
  ContainerID,
  ChestnutContainer,
  ContainerSchema,
} from './types';

import { ChestnutContainer } from './types';

export function makeContainer<T>(): ChestnutContainer<T> {
  return new Map();
}