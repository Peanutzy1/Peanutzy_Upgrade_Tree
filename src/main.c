// The single transportation unit
// GLFW stuff

#define _POSIX_C_SOURCE 199309L
#define _GNU_SOURCE

#include <stdio.h>

#include <GLFW/glfw3.h>

#include "slab.h"

#include "render.c"
#include "system.c"

ZeroSlab* slab = nullptr;
int main(void) {
    slab = z_slab_init();
    if (!slab) return 1;

    z_render_init(slab);
    z_system_init();

    printf("Slab initialized with %d max entities.\n", MAX_ENTITIES);

    glClearColor(0.0f, 0.0f, 0.0, 1.0f); 

    slab->last_time = glfwGetTime();
    while(!glfwWindowShouldClose(slab->window))
    {
        // ===== PURGATORY (important) =====
        glfwPollEvents();

        slab->current_time = glfwGetTime();
        slab->dt = (float)(slab->current_time - slab->last_time);
        slab->last_time = slab->current_time;

        
        
        z_system_loop(slab);
        z_render_loop(); // do da rendering
        glfwSwapBuffers(slab->window); // display everything
    }
}

