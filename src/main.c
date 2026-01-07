// The single transportation unit
// GLFW stuff

#define _POSIX_C_SOURCE 199309L
#define _GNU_SOURCE

#include <stdio.h>

#include <GLFW/glfw3.h>

#include "zero_slab.h"

ZeroSlab* slab = nullptr;
int main(void) {

    if (!glfwInit()) {
        printf("Failed to init GLFW\n");
        return -1;
    }

    GLFWwindow* window = glfwCreateWindow(800, 600, "Zero-Over-Zero Engine", NULL, NULL);
    if (!window) {
        printf("Failed to create window\n");
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(window);

    glfwSwapInterval(1);

    slab = zs_init_slab();

    if (!slab) return 1;

    printf("Slab initialized with %d max entities.\n", MAX_ENTITIES);


    [[maybe_unused]] float dt = 0.0f;
    double lastTime = glfwGetTime();

    glClearColor(0.0f, 0.0f, 0.0, 1.0f); 
    
    while(!glfwWindowShouldClose(window))
    {      
        // ===== INPUT =====
        glfwPollEvents();

        // ===== LOGIC =====
        float currentTime = glfwGetTime();
        dt = (float)(currentTime - lastTime);
        lastTime = currentTime;


        // ===== RENDER =====
        glClear(GL_COLOR_BUFFER_BIT);

        // ===== DISPLAY =====
        glfwSwapBuffers(window);
    }
}

