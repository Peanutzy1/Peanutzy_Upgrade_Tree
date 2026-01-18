#include <raylib.h>

#include "./z-drive/z-types.h" // IWYU pragma: keep
#include "z-drive/z-types.h"

inline int z_render_init() { return 0; }

inline void z_render_button(ZDrive *drive)
{   
    ZRenderSlab *render_slab = &drive->render_slab;
    ZChunk chunk = render_slab->chunks[0];
    for (int i = 0; i < chunk.count; i++)
    {
        Rectangle rect = {
            render_slab->positions[i].x,
            render_slab->positions[i].y,
            render_slab->sizes[i].x,
            render_slab->sizes[i].y 
        };
        
        uint8_t conditional_substract = 64 * ((render_slab->bitmasks[i] & IS_HOVERED) != 0);
        Color color = {
            255 - conditional_substract,
            255 - conditional_substract,
            255 - conditional_substract,
            255
        };

        DrawRectangleRec(rect, color);
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