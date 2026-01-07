#pragma once
#include <assert.h>
#include <stdint.h>
#include <string.h>
#include <stdlib.h>

#include <GLFW/glfw3.h>


constexpr int MAX_ENTITIES = 1 << 7;

typedef struct {
  uint16_t startIndex;
  uint16_t endIndex;
} IDChunk;

typedef struct {
  GLFWwindow* window;
  float cam_x;
  float cam_y;
  float mouse_x;
  float mouse_y;

  double last_time;
  double current_time;
  float dt;

  alignas(64)
  uint16_t active_count;
  uint16_t id_pool_top;

  alignas(64) 
  uint16_t index_to_id[MAX_ENTITIES];
  uint16_t id_to_index[MAX_ENTITIES];

  uint16_t id_pool[MAX_ENTITIES];

  float pos_x[MAX_ENTITIES];
  float pos_y[MAX_ENTITIES];
  float size_w[MAX_ENTITIES];
  float size_h[MAX_ENTITIES];
  

  uint32_t color_rgba[MAX_ENTITIES];
  uint32_t bitmask_general[MAX_ENTITIES];
  uint32_t bitmask_unique[MAX_ENTITIES];

} ZeroSlab;

static inline ZeroSlab* z_slab_init(void)
{
  ZeroSlab* slab = (ZeroSlab *)aligned_alloc(64, sizeof(ZeroSlab));
  if (!slab) return nullptr;
  memset(slab, 0, sizeof(ZeroSlab));
  for (int i = 0; i < MAX_ENTITIES; i++)
  {
      slab->id_pool[i] = i;
  }
  slab->id_pool_top = MAX_ENTITIES;
  return slab;
}

static inline uint16_t zs_spawn(ZeroSlab* slab) 
{
  // make sure the amount of entities is sufficient
  assert(slab->active_count < MAX_ENTITIES);

  uint16_t id = slab->id_pool[--slab->id_pool_top];
  uint16_t index = slab->active_count;

  slab->id_to_index[id] = index;
  slab->index_to_id[index] = id;

  slab->active_count++;
  return id;
}

static inline void zs_delete_entity(ZeroSlab* slab, uint16_t entityID)
{
  assert(slab->id_to_index[entityID] < slab->active_count);

  // Sparse map's values are basically a different system of numbers to the index of each component array
  uint16_t hole_idx = slab->id_to_index[entityID];

  // the last id and their sparse map value equivelent
  uint16_t last_idx = slab->active_count - 1;
  uint16_t last_entity_id = slab->index_to_id[last_idx];

  // =========================================
  // =========== COMPONENT SWAPPING ==========
  // =========================================

  // ====== POSITIONS ======
  slab->pos_x[hole_idx] = slab->pos_x[last_idx];
  slab->pos_y[hole_idx] = slab->pos_y[last_idx];

  // ====== SIZE ======
  slab->size_w[hole_idx] = slab->size_w[last_idx];
  slab->size_h[hole_idx] = slab->size_h[last_idx];

  // ===== COLOR ======
  slab->color_rgba[hole_idx] = slab->color_rgba[last_idx];

  // ===== BITMASKS ======
  slab->bitmask_general[hole_idx] = slab->bitmask_general[last_idx];
  slab->bitmask_unique[hole_idx] = slab->bitmask_unique[last_idx];

  // magic in these 2 lines
  slab->id_to_index[last_entity_id] = hole_idx;
  slab->index_to_id[hole_idx] = last_entity_id;

  // add id to the pool to be reused
  assert(slab->id_to_index[entityID] != 0xFFFF);
  slab->id_pool[slab->id_pool_top++] = entityID;
  slab->active_count--;

  assert(slab->active_count >= 0);
}
