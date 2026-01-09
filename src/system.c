#include <stdio.h>
#include "./z-drive/z-drive.h" // IWYU pragma: keep

int z_system_init() {
    printf("hi the systems init");
    return 0;
}

int z_system_loop(ZDrive* drive) {
    drive->cam_x += drive->delta_time;
    printf("hi your camera x is: %f\n", drive->cam_x);
    return 0;
}