#include <string.h>

#include "z-types.h"
#include "z-drive.h" // IWYU pragma: keep


static inline void z_render_slab_init(ZDrive* zdrive) 
{
    ZSlabHeader* header = &zdrive->render_slab.head;
    memset(header->index_to_chunk, 0xFF, sizeof(header->index_to_chunk));

    for (int i = 0; i < MAX_CHUNKS_PER_SLAB; i++) 
    {
        header->chunks[i] = (ZChunk){
            .start_index = (i == 1) ? 0 : -1,
        };
    }
}