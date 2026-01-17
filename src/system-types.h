#include "./z-drive/z-types.h"
typedef struct
{
    ZDrive *drive;
    ZSlabHeader *head;
    ZChunkId chunk_id;
    Vector2 (*positions)[MAX_ENTITIES];
    Vector2 (*sizes)[MAX_ENTITIES];
    Vector2 out_changes_index[MAX_ENTITIES];
    Vector2 out_changes[MAX_ENTITIES];
} ZHitcheckDescriptor;