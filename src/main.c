// The single transportation unit

#include <raylib.h>

#include "./z-drive/z-drive-tools.h"

#include "render.c"
#include "system.c"
#include "setup.c"

ZDrive *drive = nullptr;
int main(void)
{
    drive = z_drive_init();
    if (!drive)
        return 1;
    
    z_setup(drive);

    z_render_init();
    z_system_init();

    InitWindow(800, 450, "zero-over-zero");
    SetConfigFlags(FLAG_VSYNC_HINT);

    while (!WindowShouldClose())
    {
        PollInputEvents();

        drive->delta_time = GetFrameTime();

        z_system_loop(drive);
        z_render_loop();
    }

    CloseWindow();
}
