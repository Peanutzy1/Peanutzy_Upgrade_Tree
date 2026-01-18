#include <assert.h>
#include "z-types.h"
#include "z-args-types.h"

static inline bool z_chunk_has_space(ZChunk *chunks, uint8_t chunk_id)
{
    ZChunk *chunk = &chunks[chunk_id];

    if (chunk->start_index < 0)
        return false;

    if (chunk_id < MAX_CHUNKS_PER_SLAB - 1)
    {
        ZChunk *next = &chunks[chunk_id + 1];
        if (next->start_index >= 0)
        {
            return (chunk->start_index + chunk->count < next->start_index);
        }
    }

    return (chunk->start_index + chunk->count < MAX_ENTITIES);
}

static inline ZEntityId z_entity_add(ZDrive *drive, ZEntityDescriptor desc)
{
    ZSlabHeader *header = &drive->render_slab.head;
    ZChunk *chunk = &desc.render_slab_chunks[desc.render_slab_chunk];

    ZEntityIndex render_slab_index = chunk->start_index + chunk->count;
    chunk->count++;

    ZEntityId id = drive->id_pool[drive->id_pool_top];
    drive->id_pool_top--;

    header->id_to_index[id] = render_slab_index;
    header->index_to_id[render_slab_index] = id;
    header->index_to_chunk[render_slab_index] = desc.render_slab_chunk;

    return id;
}

static inline ZEntityIndex z_entity_header_remove(ZSlabHeader *header, ZChunk *chunks, ZEntityId id_to_remove, ZEntityIndex *out_last_index) {
    ZEntityIndex hole_index = header->id_to_index[id_to_remove];
    uint8_t cid = header->index_to_chunk[hole_index];
    ZChunk *chunk = &chunks[cid];

    *out_last_index = chunk->start_index + chunk->count - 1;

    ZEntityId last_id = header->index_to_id[*out_last_index];

    header->id_to_index[last_id] = hole_index;
    header->index_to_id[hole_index] = last_id;
    header->index_to_chunk[hole_index] = cid;

    chunk->count--;
    return hole_index;
}

static inline void z_entity_remove(ZDrive *drive, ZEntityId id_to_remove)
{
    ZEntityIndex last_index; // changes per slab
    ZSlabHeader *header = &drive->render_slab.head;
    ZChunk *chunks = drive->render_slab.chunks;
    ZEntityIndex hole_idx = z_entity_header_remove(header, chunks, id_to_remove, &last_index);
    drive->render_slab.positions[hole_idx] = drive->render_slab.positions[last_index];
    drive->id_pool_top++;
    drive->id_pool[drive->id_pool_top] = id_to_remove;
}