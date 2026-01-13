#pragma once
#define MAX_ENTITIES 128
#define MAX_CHUNKS_PER_SLAB 16
#include <stdint.h>

typedef int16_t ZEntityId;
typedef int16_t ZEntityIndex;
typedef int16_t ZEntityMaxAmount;

struct ZDrive;
typedef struct ZDrive ZDrive;

typedef struct
{
    uint8_t render_slab_chunk;
} ZEntityDescriptor;

typedef struct
{
    ZEntityMaxAmount count;
    ZEntityIndex start_index;
} ZChunk;

typedef struct
{
    ZChunk chunks[MAX_CHUNKS_PER_SLAB];
    ZEntityIndex index_to_chunk[MAX_ENTITIES];
    ZEntityIndex id_to_index[MAX_ENTITIES];
    ZEntityId index_to_id[MAX_ENTITIES];

    uint8_t chunk_count;

    uint8_t pad;
} ZSlabHeader;
