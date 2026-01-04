CC = clang
CFLAGS = -std=c23 -Iinclude -O3 -Wall -Wextra -Werror -Wpedantic
SRC = src/main.c
OUT = build/zero-over-zero

all:
	mkdir -p build
	$(CC) $(SRC) -o $(OUT) $(CFLAGS)


clean:
	rm -rf build