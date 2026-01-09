#pragma once

#include <stdint.h>
#include <GLFW/glfw3.h>
#include "z-types.h"

typedef struct {
    ZSlabHeader head;
    float pos_x[MAX_ENTITIES];
    float pos_y[MAX_ENTITIES];
} ZRenderSlab;