#include "z-drive/z-types.h"
#include <raylib.h> 

inline void z_listener_init(ZDrive *drive) 
{
    drive->screen_size.x = GetScreenWidth();
    drive->screen_size.y = GetScreenHeight();

    drive->camera.target = (Vector2){ 0.0f, 0.0f };
    drive->camera.offset = (Vector2){
        drive->screen_size.x / 2.0f,
        drive->screen_size.y / 2.0f
    };
    drive->camera.rotation = 0.0f;
    drive->camera.zoom = 1.0f;

    drive->mouse_screen = GetMousePosition();
    drive->mouse_world = GetScreenToWorld2D(
        drive->mouse_screen,
        drive->camera
    );
}

inline void z_listener_loop(ZDrive *drive) 
{
    drive->screen_size.x = GetScreenWidth();
    drive->screen_size.y = GetScreenHeight();

    drive->camera.target = drive->camera_position;
    drive->camera.offset = (Vector2){
        drive->screen_size.x / 2.0f,
        drive->screen_size.y / 2.0f
    };

    drive->mouse_screen = GetMousePosition();
    drive->mouse_world = GetScreenToWorld2D(
        drive->mouse_screen,
        drive->camera
    );
}