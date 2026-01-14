#pragma once

#include <stdlib.h>
#include <string.h>

#include "z-types.h" // IWYU pragma: keep

static inline void z_render_slab_init(ZDrive *drive)
{
    ZSlabHeader *header = &drive->render_slab.head;
    memset(header->index_to_chunk, 0xFF, sizeof(header->index_to_chunk));

    for (int i = 0; i < MAX_CHUNKS_PER_SLAB; i++)
    {
        header->chunks[i] = (ZChunk){
            .start_index = (i == 0) ? 0 : -1,
        };
    }
}

static inline ZDrive *z_drive_init()
{
    ZDrive *drive = aligned_alloc(64, sizeof(ZDrive));
    if (!drive)
        return nullptr;

    for (int i = 0; i < MAX_ENTITIES; i++)
    {
        drive->id_pool[i] = i;
    }

    drive->id_pool_top = MAX_ENTITIES - 1;

    z_render_slab_init(drive);

    return drive;
}
