cmake_minimum_required(VERSION 3.10)
project(ZeroOverZero C)

include_directories(src)
set(SOURCE_FILES
        src/main.c
)

add_executable(zero-over-zero ${SOURCE_FILES})