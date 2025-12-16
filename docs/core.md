# The Core Elements
## Container
### Definition
- A container stores components (data) for entities (IDs). its literally a Map<EntityID, T> 

- You create a container via the ChestnutContainer type in [here](../src/core/ChestnutContainer) (silly, ikr)

### Methods
- whatever method is in a javascript Map()

### Example:

```ts
type Position = { x: number; y: number };

// Create a container
const positionContainer: ChestnutContainer<Position> = new Map();

// Add a component for an entity
// entity1 is the ID, { x, y } is the component
positionContainer.add('entity1', { x: 100, y: -100 });

// Retrieve component
const elementPosition = positionContainer.get('entity1');
console.log(elementPosition); // { x: 100, y: -100 }

// Delete component
positionContainer.delete('entity1');
```

## Manager
- A manager is the “god object” that knows about all containers and all hooks. It can bundle components for an entity, and hooks can operate on it.
- hooks is an object that has HazelnutHooks in it
- containers is an object that has ChestnutContainers in it
- you create a manager via the MacademiaManager class in [here](../src/core/MacademiaManager) (also silly as hecc)
**NOTE**: you have to pass the ContainerMap Generic to the constructor so that it knows the Containers layout
### Methods + how to call
Class call for reference: `MacademiaManager<S extends ContainerSchema>`
- `addHook(name: string, hook: HazelnutHook<S>)`
- `addEntity(id: EntityID)`
- `addComponents(id: EntityID, components: Partial<ContainerMapFromSchema<S>>)`
- `getComponents(id: EntityID)`
- `deleteEntityAndComponents(id: EntityID`)

### Example:

```ts

// a utils function cuz boilerplate sucks

const schema = {
  position: makeContainer<{x: number, y: number}>
  health: makeContainer<number>
}

// Create a manager

// containers are automatically added via the schema, the generic is inferred from the schema
const manager = new MacademiaManager(schema);

// Add entities
manager.addEntity('entity1');

manager.addComponents('entity1', {
  position: {x: 10, y: 20},
  health: 100
})

// Retrieve a full entity bundle
const entity = manager.getEntityComponents('entity1'); // getEntity bundles all components for the given ID
console.log(entity);
// Output: { position: { x: 10, y: 20 }, health: 100 }

// Delete an entity and its components
manager.deleteEntityAndComponents('entity1')
```

## Hook
### Definition
A hook keeps track of which entities are “active” at any given moment. It stores two things:
1. culls functions that take a bunch of entity IDs and return a filtered list of IDs that are still relevant.
  - think of it like a filter, each cull function filters out the ids that don't pass certain requirements
2. ActiveIDs is the final list of entities that survived the culls
- You create a hook using the HazelnutHook class in [here](../src/core/HazelnutHook) (veri silly)
**NOTE**: The hook is generic over the same ContainerMap as the manager it operates on.
### Methods
  - addCull(fn: CullFn)
  - cull()
  - runFunc(fn: (id: string) => void)
  - getActiveIDs()

### Example:
```ts

// make a schema
const schema = {
  position: makeContainer<{x: number, y: number}>
  health: makeContainer<number>
}

// Create a manager first
const manager = new MacademiaManager(schema);

// Add an entity
positionContainer.set('entity1', { x: 0, y: 0 });
healthContainer.set('entity1', 100);

// Create a hook
const aliveHook = new HazelnutHook(manager);

// Add a cull function: only entities with health > 0
aliveHook.addCull((ids, mgr) =>
  ids.filter(id => (mgr.getComponents(id).health ?? 0) > 0)
);

// Add entities
manager.addEntity('entity1');

manager.addComponents('entity1', {
  position: {x: 10, y: 20},
  health: 100
})

manager.addEntity('entity2');

manager.addComponents('entity2', {
  position: {x: 30, y: -40},
  health: 0
})


// Add hook to manager
manager.addHook('alive', aliveHook);

// Run the hook on a set of IDs
aliveHook.cull();

// Run a function on active IDs
aliveHook.runFunc(id => {
  console.log('Active entity:', id, manager.getComponents(id));
  // > Active entity: entity1, { position: { x: 10, y: 20 }, health: 100 }
});
```