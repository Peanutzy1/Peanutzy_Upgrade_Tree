#include "z-drive/z-types.h" // IWYU pragma: keep
#include "z-drive/z-entity-tools.h"
#include "z-drive/z-types.h"

inline void z_setup(ZDrive *drive)
{
    ZEntityId button =
        z_entity_add(drive, (ZEntityDescriptor){
            drive->render_slab.chunks,
            0 }
        );
    
    ZRenderSlab *rs = &drive->render_slab;
    ZEntityIndex index_b1 = rs->head.id_to_index[button];
    rs->positions[index_b1].x = 0;
    rs->positions[index_b1].y = 0;
    rs->sizes    [index_b1].x = 320;
    rs->sizes    [index_b1].y = 200;
}