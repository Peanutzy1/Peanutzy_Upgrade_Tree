#include "z-drive/z-types.h" // IWYU pragma: keep
#include "z-drive/z-entity-tools.h"
#include "z-drive/z-types.h"

inline void z_setup(ZDrive *drive)
{
    ZEntityIndex *id_to_index = drive->render_slab.head.id_to_index;
    ZEntityId button =
        z_entity_add(drive, (ZEntityDescriptor){.render_slab_chunk = 0});

    drive->render_slab.positions[id_to_index[button]].x = 0;
    drive->render_slab.positions[id_to_index[button]].y = 0;
}