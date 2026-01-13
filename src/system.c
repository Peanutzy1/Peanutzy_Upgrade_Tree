#include "./z-drive/z-drive.h" // IWYU pragma: keep
#include <stdio.h>

int z_system_init()
{
    printf("hi the systems init");
    return 0;
}

int z_system_loop(ZDrive *drive)
{
    printf("Delta: %f | CamX: %.20f\n", drive->delta_time, drive->cam_x);
    return 0;
}