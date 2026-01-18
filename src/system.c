#include <raylib.h>

#include "./z-drive/z-types.h"

inline void z_system_init(ZDrive *drive)
{
    drive->move_speed = 100;
}

inline ZDrive* z_system_loop(ZDrive *drive)
{
    return drive;
}

inline void z_movement(ZDrive *drive) {
    float movement = drive->move_speed * drive->delta_time;
    drive->camera_position.x += movement * (IsKeyDown(KEY_D) - IsKeyDown(KEY_A));
    drive->camera_position.y += movement * (IsKeyDown(KEY_S) - IsKeyDown(KEY_W));
}

inline void z_zoom(ZDrive *drive) {
    if (IsKeyPressed(KEY_I)) drive->camera.zoom += 0.25f;
    if (IsKeyPressed(KEY_O)) drive->camera.zoom -= 0.25f;

    if (drive->camera.zoom < 0.25f) drive->camera.zoom = 0.25f;
    if (drive->camera.zoom > 10.0f)  drive->camera.zoom = 10.0f;
}

inline void z_hitcheck(ZDrive *drive) {
    ZRenderSlab *render_slab = &drive->render_slab;

    // no chunks doesnt get mutated midrun
    ZChunk chunk = render_slab->chunks[0]; 

    // FUTURE: change 0 to dedicated button chunk / chunks
    for (int i = chunk.start_index; i < chunk.count; i++) 
    {
        Rectangle whatever_this_is = {
            render_slab->positions[i].x,
            render_slab->positions[i].y,
            render_slab->sizes[i].x,
            render_slab->sizes[i].y,
        };

        if (CheckCollisionPointRec(drive->mouse_world, whatever_this_is)) {
            render_slab->bitmasks[i] |= IS_HOVERED;
        } else {
            render_slab->bitmasks[i] &= ~(IS_HOVERED);
        }
    }
}