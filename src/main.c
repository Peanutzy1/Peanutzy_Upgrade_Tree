// The single transportation unit

#include <raylib.h>

#include "./z-drive/z-drive-tools.h"

#include "render.c"
#include "setup.c"
#include "system.c"
#include "listeners.c"

ZDrive *drive = nullptr;
Camera2D camera = {0};
int main(void)
{
    drive = z_drive_init();
    if (!drive)
        return 1;

    PollInputEvents();
    z_setup(drive);
    z_listener_init(drive);
    z_render_init();
    z_system_init(drive);

    InitWindow(800, 450, "zero-over-zero");
    SetConfigFlags(FLAG_VSYNC_HINT);

    while (!WindowShouldClose())
    {
        PollInputEvents();
        z_listener_loop(drive);
        drive->delta_time = GetFrameTime();
        
        z_movement(drive);

        z_system_loop(drive);
        z_render_loop(drive);
    }

    CloseWindow();
}
