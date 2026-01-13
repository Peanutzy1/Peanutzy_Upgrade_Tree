#pragma once

#include "z-types.h"
#include <GLFW/glfw3.h>
#include <stdint.h>

typedef struct
{
    ZSlabHeader head;
    float pos_x[MAX_ENTITIES];
    float pos_y[MAX_ENTITIES];
} ZRenderSlab;