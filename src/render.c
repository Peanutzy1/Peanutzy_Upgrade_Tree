#include "./z-drive/z-drive.h" // IWYU pragma: keep
#include <raylib.h>

int z_render_init() { return 0; }

int z_render_loop() 
{   
    BeginDrawing();
    ClearBackground(GetColor(0x000000ff));
    EndDrawing();
    return 0; 
}