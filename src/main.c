#include "zero_slab.h"
#include <stdio.h>

ZeroSlab* slab = nullptr;
int main()
{
	slab = init_slab();
	// ReSharper disable once CppLocalVariableMayBeConst
	float my_val = slab -> pos_x[1] = 1000;
	printf("Value: %f\n", my_val);
	return 0;
}
