CC = clang
MY_CFLAGS = -std=c23 -Iinclude -Isrc/glfw/include -D_GLFW_X11 -O3 -Wall -Wextra -Werror -lX11 -lGL -lm -lpthread -ldl
SRC = src/main.c src/glfw/src/*.c
OUT = build/zero-over-zero
LIB_CFLAGS = -Isrc/glfw/include -D_GLFW_X11 -O3 -w

all:
	mkdir -p build
	$(CC) src/main.c build/glfw.o -o $(OUT) $(MY_CFLAGS)

glfw:
	mkdir -p build
	$(CC) -c src/glfw/src/*.c $(LIB_CFLAGS)
	mv *.o build/
	ld -r build/*.o -o build/glfw.o
	rm build/context.o build/init.o build/input.o 
	find build/ -type f ! -name 'glfw.o' -delete

clean:
	rm -rf build
