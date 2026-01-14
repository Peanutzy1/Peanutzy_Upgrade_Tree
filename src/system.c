#include "./z-drive/z-types.h" // IWYU pragma: keep
#include <raylib.h>
#include <stdio.h>

inline void z_system_init(ZDrive *drive)
{
    drive->move_speed = 100;
}

inline void z_system_loop(ZDrive *drive)
{
    printf("Delta: %f | CamX: %.20f\n", drive->delta_time, drive->camera_position.x);
}

inline void z_movement(ZDrive *drive) {
    float movement = drive->move_speed * drive->delta_time;
    drive->camera_position.x += movement * (IsKeyDown(KEY_D) - IsKeyDown(KEY_A));
    drive->camera_position.y += movement * (IsKeyDown(KEY_S) - IsKeyDown(KEY_W));
}