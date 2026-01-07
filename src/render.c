#include <stdio.h>

#include <GLFW/glfw3.h>

#include "slab.h"

int z_render_init(ZeroSlab* slab) {
    if (!glfwInit()) {
        printf("Failed to init GLFW\n");
        return -1;
    }

    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    slab->window = glfwCreateWindow(800, 600, "Zero-Over-Zero", NULL, NULL);
    
    if (!slab->window) {
        printf("Failed to create window\n");
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(slab->window);
    glfwSwapInterval(1); // Enable VSync

    glClearColor(0.1f, 0.1f, 0.15f, 1.0f); 

    return 0;
}

int z_render_loop() {
    glClear(GL_COLOR_BUFFER_BIT);
    return 0;
}