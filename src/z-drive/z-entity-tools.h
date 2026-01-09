#include <assert.h>
#include "z-drive.h" // IWYU pragma: keep

static inline bool z_chunk_has_space(ZSlabHeader* header, uint8_t chunk_id) {
    ZChunk* chunk = &header->chunks[chunk_id];

    if (chunk->start_index < 0) return false;

    if (chunk_id < MAX_CHUNKS_PER_SLAB - 1) {
        ZChunk* next = &header->chunks[chunk_id + 1];
        if (next->start_index >= 0) {
            return (chunk->start_index + chunk->count < next->start_index);
        }
    }

    return (chunk->start_index + chunk->count < MAX_ENTITIES);
}

static inline ZEntityId z_entity_add(ZDrive* z_ptr, ZEntityDescriptor desc) 
{
    ZSlabHeader* header = &z_ptr->render_slab.head;
    ZChunk* chunk = &header->chunks[desc.render_slab_chunk];

    assert(z_chunk_has_space(header, desc.render_slab_chunk));

    ZEntityIndex render_slab_index = chunk->start_index + chunk->count;
    chunk->count++;

    ZEntityId id = z_ptr->id_pool[z_ptr->id_pool_top];
    z_ptr->id_pool_top--;

    header->id_to_index[id] = render_slab_index;
    header->index_to_id[render_slab_index] = id;
    header->index_to_chunk[render_slab_index] = desc.render_slab_chunk;

    return id;
}

static inline void z_entity_remove(ZDrive* z_ptr, ZEntityId id_to_remove) 
{
    ZSlabHeader* header = &z_ptr->render_slab.head;
    
    ZEntityIndex hole_idx = header->id_to_index[id_to_remove];
    uint8_t cid = header->index_to_chunk[hole_idx];
    ZChunk* chunk = &header->chunks[cid];

    ZEntityIndex last_idx = chunk->start_index + chunk->count - 1;
    ZEntityId last_id = header->index_to_id[last_idx];

    z_ptr->render_slab.pos_x[hole_idx] = z_ptr->render_slab.pos_x[last_idx];
    z_ptr->render_slab.pos_y[hole_idx] = z_ptr->render_slab.pos_y[last_idx];

    header->id_to_index[last_id] = hole_idx;
    header->index_to_id[hole_idx] = last_id;

    chunk->count--;

    z_ptr->id_pool_top++;
    z_ptr->id_pool[z_ptr->id_pool_top] = id_to_remove;
}