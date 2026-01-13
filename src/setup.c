#include "z-drive/z-drive.h" // IWYU pragma: keep
#include "z-drive/z-entity-tools.h"
#include "z-drive/z-types.h"

inline void z_setup(ZDrive *drive) {
    ZEntityIndex *id_to_index = drive->render_slab.head.id_to_index;
    ZEntityId button = z_entity_add(
        drive, 
        (
        ZEntityDescriptor){
            .render_slab_chunk = 1
        }
    );

    drive->render_slab.pos_x[id_to_index[button]] = 0;
    drive->render_slab.pos_y[id_to_index[button]] = 0;
}