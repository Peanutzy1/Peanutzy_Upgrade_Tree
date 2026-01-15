#include "./z-drive/z-types.h" // IWYU pragma: keep
#include "z-drive/z-types.h"
#include <raylib.h>

inline int z_render_init() { return 0; }

inline void z_render_button(ZDrive *drive) 
{
    ZChunk chunk = drive->render_slab.head.chunks[0];
    for (int i = 0; i < chunk.count; i++ ) 
    {
        Rectangle rect = {
            drive->render_slab.positions[i].x,
            drive->render_slab.positions[i].y,
            100, // width
            50   // height
        };

        DrawRectangleRec(rect, GetColor(0xcba6f7ff));
    };
}

void z_render_loop(ZDrive *drive)
{
    BeginDrawing();
    BeginMode2D(drive->camera);
    ClearBackground(GetColor(0x000000ff));
    z_render_button(drive);
    EndMode2D();
    EndDrawing();
}