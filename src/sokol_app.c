/*
 * This file makes a sokol app
 * I hate cross-platform compatibility
 */

#include "zero_slab.h"

static struct
{
    sg_pass_action pass_action;  
} state;

extern ZeroSlab* slab;
static void init(void)
{
  sg_setup(&(sg_desc){
    .environment = sglue_environment(),
    .logger.func = slog_func
  }); 
  
  state.pass_action = (sg_pass_action) {
    // nothing :/
  };

  slab = init_slab();
}

static void frame(void) 
{
  // nothing  
}

static void cleanup(void) {
  // nothing
}

sapp_desc sokol_main(int argc, char* argv[]) {
    (void)argc;
    (void)argv;
  return (sapp_desc){
    .init_cb = init,
    .frame_cb = frame,
    .cleanup_cb = cleanup, 
    .width = 400,
    .height = 300,
    .window_title = "zero-over-zero",
    .icon.sokol_default = true,
    .logger.func = slog_func,
  };
}
