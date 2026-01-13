CC = clang

MY_CFLAGS = -std=c23 -I/usr/include -O3 -Wall -Wextra -Werror
LIBS = -lraylib -lGL -lm -lpthread -ldl -lrt -lX11

SRC = src/main.c
OUT = build/zero-over-zero

all:
	mkdir -p build
	$(CC) $(SRC) -o $(OUT) $(MY_CFLAGS) $(LIBS)

run: all
	./$(OUT)

clean:
	rm -rf build