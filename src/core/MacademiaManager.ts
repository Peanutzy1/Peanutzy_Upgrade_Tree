// this file is for the manager system
import { ChestnutContainer, ContainerMapFromSchema, ContainerSchema } from './types';
import { HazelnutHook } from './HazelnutHook';
import { EntityID } from './types';

export class MacademiaManager<S extends ContainerSchema> {
  containers: { [K in keyof S]?: ChestnutContainer<ContainerMapFromSchema<S>[K]> } = {};
  hooks: Record<string, HazelnutHook<S>> = {};
  entities: Set<EntityID> = new Set();

  constructor(schema: S) {
    for (const key in schema) {
      this.containers[key] = schema[key]();
    }
  }

  addEntity(id: EntityID) {
    if (this.entities.has(id)) {
      throw new Error(`Entity ${id} already exists.`);
    }

    this.entities.add(id);
  }

  addComponents(id: EntityID, components: Partial<ContainerMapFromSchema<S>>) {
    if (components == null || typeof components !== 'object') {
      throw new Error(`Components must be a non-null object.`);
    }

    if (!this.entities.has(id)) {
      throw new Error(`Entity ${id} does not exist.`);
    }

    for (const key in components) {
      const container = this.containers[key as keyof S];
      if (!container) throw new Error(`Container ${key} does not exist.`);

      const component = components[key as keyof S];
      if (component) container.set(id, component);
    }
  }

  deleteEntityAndComponents(id: EntityID) {
    if (!this.entities.has(id)) return;

    for (const key in this.containers) {
      const container = this.containers[key as keyof S];
      container?.delete(id);
    }

    this.entities.delete(id);
  }

  getComponents(id: EntityID): Partial<ContainerMapFromSchema<S>> {
    if (!this.entities.has(id)) {
      throw new Error(`the entity ${id} does not exist.`);
    }

    const bundle: Partial<ContainerMapFromSchema<S>> = {};

    for (const key in this.containers) {
      const container = this.containers[key as keyof S];

      if (!container) continue;

      const component = container.get(id);

      if (component) {
        bundle[key] = component;
      }
    }

    return bundle;
  }
}
