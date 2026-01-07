#include <stdio.h>
#include "./slab.h"

int z_system_init() {
    printf("hi the systems init");
    return 0;
}

int z_system_loop(ZeroSlab* slab) {
    slab->cam_x += slab->dt;
    printf("hi your camera x is: %f\n", slab->cam_x);
    return 0;
}