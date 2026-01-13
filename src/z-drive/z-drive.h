#pragma once
#include "z-slab.h"
#include "z-types.h"

struct ZDrive
{
    ZEntityId id_pool[MAX_ENTITIES];
    ZEntityMaxAmount id_pool_top;

    ZRenderSlab render_slab;

    float cam_x, cam_y;
    float delta_time;
};