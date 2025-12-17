// this file contains types.. and thats it.

import { MacademiaManager } from './MacademiaManager';

export type CullFn<S extends ContainerSchema> = (ids: string[], manager: MacademiaManager<S>) => string[];

export type EntityID = string;
export type ContainerID = string;

export type ChestnutContainer<T> = Map<EntityID, T>

export type ContainerSchema = Record<ContainerID, () => ChestnutContainer<any>>

export type ContainerMapFromSchema<S extends ContainerSchema> = {
  [K in keyof S]: ReturnType<S[K]> extends ChestnutContainer<infer T> ? T : never;
};
