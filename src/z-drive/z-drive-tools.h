#pragma once
#include "z-drive.h" // IWYU pragma: keep
#include "z-slab-tools.h"
#include <stdlib.h>

static inline ZDrive* z_drive_init() 
{
    ZDrive* zdrive = aligned_alloc(64, sizeof(ZDrive));
    if(!zdrive) return nullptr;

    for (int i = 0; i < MAX_ENTITIES; i++) {
        zdrive->id_pool[i] = i;
    }
    zdrive->id_pool_top = MAX_ENTITIES - 1;

    z_render_slab_init(zdrive);
    
    return zdrive;
}

