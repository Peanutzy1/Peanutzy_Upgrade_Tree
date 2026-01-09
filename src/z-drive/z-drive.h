#pragma once
#include <GLFW/glfw3.h>
#include "z-slab.h"
#include "z-types.h"

struct ZDrive {
    ZEntityId id_pool[MAX_ENTITIES];
    ZEntityMaxAmount id_pool_top;
    
    ZRenderSlab render_slab;

    float cam_x, cam_y;
    double current_time, last_time;
    float delta_time;
    GLFWwindow* window;
    
};