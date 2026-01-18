#pragma once
#include <raylib.h>
#include <stdint.h>

#define MAX_ENTITIES 128
#define MAX_CHUNKS_PER_SLAB 16

typedef int16_t ZEntityId;
typedef int16_t ZEntityIndex;
typedef int16_t ZEntityMaxAmount;
typedef int16_t ZChunkId;

typedef struct
{
    ZEntityMaxAmount count;
    ZEntityIndex start_index;
} ZChunk;

typedef struct
{
    ZEntityIndex index_to_chunk[MAX_ENTITIES];
    ZEntityIndex id_to_index[MAX_ENTITIES];
    ZEntityId index_to_id[MAX_ENTITIES];

    uint8_t chunk_count;

    uint8_t pad;
} ZSlabHeader;

#define IS_HOVERED 1 << 0
typedef struct
{
    ZSlabHeader head;
    ZChunk chunks[MAX_CHUNKS_PER_SLAB];
    Vector2 positions[MAX_ENTITIES];
    Vector2 sizes[MAX_ENTITIES];
    uint16_t bitmasks[MAX_ENTITIES];
} ZRenderSlab;

#define Z_MOUSE_LEFT 1 << 0
typedef struct
{
    ZEntityId id_pool[MAX_ENTITIES];
    ZEntityMaxAmount id_pool_top;

    ZRenderSlab render_slab;

    Camera2D camera;

    Vector2 camera_position;
    Vector2 mouse_world;
    Vector2 mouse_screen;
    Vector2 screen_size;
    float move_speed;
    float delta_time;
    uint8_t mouse_states;
    // uint32_t padding[14];
} ZDrive;
