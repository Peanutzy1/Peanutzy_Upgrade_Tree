#pragma once
#include "z-types.h"

typedef struct
{
    ZChunk *render_slab_chunks;
    uint8_t render_slab_chunk;
} ZEntityDescriptor;
