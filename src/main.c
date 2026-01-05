// The single transportation unit
define _POSIX_C_SOURCE 199309L
#define _POSIX_C_SOURCE 199309L
#define SOKOL_IMPL
#define SOKOL_GLCORE

#include "sokol_app.h"
#include "sokol_gfx.h"
#include "sokol_glue.h"
#include "sokol_log.h"

#include "sokol_app.c"

#include "zero_slab.h"


ZeroSlab* slab = nullptr;
