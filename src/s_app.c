/*
 * This file makes a sokol app
 * I hate cross-platform compatibility
 */

#define SOKOL_IMPL
#include "big_bad_sokol_headers/sokol_app.h"
#include "big_bad_sokol_headers/sokol_gfx.h"
#include "big_bad_sokol_headers/sokol_glue.h"

static struct
{
    sg_pass_action pass_action;
} state;

void init(void)
{
  sg_setup(&(sg_desc){
    .enviroment = sglue_enviroment(),
    .logger.func = slog_func
  });
}
