// The single transportation unit
// GLFW stuff

#define _POSIX_C_SOURCE 199309L
#define _GNU_SOURCE

#include <stdio.h>

#include <GLFW/glfw3.h>

#include "./z-drive/z-drive-tools.h"

#include "render.c"
#include "system.c"

ZDrive* drive = nullptr;
int main(void) {
    drive = z_drive_init();
    if (!drive) return 1;

    z_render_init(drive);
    z_system_init();

    printf("drive initialized with %d max entities.\n", MAX_ENTITIES);

    glClearColor(0.0f, 0.0f, 0.0, 1.0f); 

    drive->last_time = glfwGetTime();
    while(!glfwWindowShouldClose(drive->window))
    {
        // ===== PURGATORY (important) =====
        glfwPollEvents();

        drive->current_time = glfwGetTime();
        drive->delta_time = (float)(drive->current_time - drive->last_time);
        drive->last_time = drive->current_time;

        
        
        z_system_loop(drive);
        z_render_loop(); // do da rendering
        glfwSwapBuffers(drive->window); // display everything
    }
}

